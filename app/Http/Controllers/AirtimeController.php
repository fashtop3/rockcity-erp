<?php

namespace App\Http\Controllers;

use App\Client;
use App\Events\ScheduleHasBeenPlaced;
use App\ProductTime;
use App\Promocode;
use App\Schedule;
use App\ScheduleAlert;
use App\ScheduleProduct;
use App\ScheduleProductSub;
use App\ScheduleProductSubDetail;
use App\SubscriptionAttachment;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;

class AirtimeController extends Controller
{

    private $user;

    public function __construct()
    {
        $this->middleware('auth');

        $this->user = Auth::user();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request)
    {

        $schedules = Schedule::where('user_id', Auth::user()->id);

        if($request->get('min') && $request->get('max')) {

            $schedules = Schedule::where('user_id', Auth::user()->id)
                ->latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->currentUser()
                ->with('user')
                ->with('client')
                ->with('scheduleAlert')
                ->get();
        }
        else {
            $schedules = Schedule::where('user_id', Auth::user()->id)
                ->currentUser()
                ->with('user')
                ->with('client')
                ->with('scheduleAlert')
                ->get();
        }


//        $schedules->get();

        if(!$schedules) {
            return response('Order empty', 403);
        }

        return response($schedules);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $uploads = []; //holds uploaded filenames
        $client = $request->get('client');
        $marketer = $request->get('marketer');
        $cart = $request->get('cart');

        try{
            DB::beginTransaction();

            $marketer = User::find($marketer['id']);
            $client = Client::find($client['id']);

            $airtimeSchedule = $request->get('sub');
            $airtimeSchedule['user_id'] = $marketer->id;
            $airtimeSchedule['client_id'] = $client->id;

            //create schedule
            if($schedule = Schedule::create($airtimeSchedule)) {

                if(!empty($airtimeSchedule['promocode']['discount']))
                    Promocode::apply($airtimeSchedule['promocode']['discount']);
                if(!empty($airtimeSchedule['promocode']['coupon']))
                    Promocode::apply($airtimeSchedule['promocode']['coupon']);

                foreach($cart as $products){ //each array in the cart is a product

                    $myProduct = ScheduleProduct::create([
                        'schedule_id' => $schedule->id,
                        'product_id' => $products['id']
                    ]);

                    foreach($products['subscriptions'] as $subscription) {
                        $this->processSubscription($subscription, $schedule, $myProduct, $uploads);
                    }
                }

                //create alert for cron jobs
                ScheduleAlert::create(['schedule_id' => $schedule->id, 'token' => bcrypt(Carbon::now())]);

                Schedule::setOrderNo($schedule);
                $schedule->save();

                //mail out the invoice
                try{
//                    Event::fire(new ScheduleHasBeenPlaced($schedule));
                }
                catch(\Exception $e) {
                    $this->cleanUploadsOnError($uploads);
                    return response('Error: Mail Server not reachable! try again or contact Administrator', 403);
                }


                DB::commit();
//                return response('force error', 403);
                return response(['data'=>'Order submitted successfully']);
            }

            $this->cleanUploadsOnError($uploads);
            return response('Order processing failed', 403);

        }
        catch(\Exception $e) {
            $this->cleanUploadsOnError($uploads);
//            return response('Server Error: contact site Administrator', 403);
            return response($e->getMessage(), 403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $prog_time = ProductTime::first();
            $schedule = Schedule::findOrFail($id);

            $schedule->user->toArray();
            $schedule->client->toArray();
            $schedule->schProducts->toArray();

            foreach($schedule->schProducts as $product) {
                $product->product->toArray();
                $product->schProductSubs->toArray();
                foreach($product->schProductSubs as $schProductSub) {
                    if(!empty($schProductSub->slotDetails()->get())) {
                        $schProductSub->slotDetails->toArray();
                    }
                    $product['totals'] += $schProductSub->subscription['amount'];
                }
            }

            $schedule->scheduleAlert->toArray();

            return response(['schedule'=>$schedule, 'prog_time'=>$prog_time]);
        }
        catch(\Exception $e) {
            return response('Airtime not found', 403);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function validateScheduledAirtime($id, Request $request)
    {
        $alert = ScheduleAlert::find($id);

        if(!$alert){
            return response('not found', 403);
        }

        if ($this->user->is('head.marketing') /*$this->user->canValidateAirtime()*/) {

//            if(!$alert->validate) {

            $alert->mail = ScheduleAlert::VALIDATED;
            $alert->validate = $request->get('validate');
            $alert->validate_signed = Carbon::now();
            $alert->validated_by = $this->user->id;

            $alert->save();

            //send notification mail
            //Head of marketing receives mail for recommendation
            $this->sendEmailNotification($alert);

            if($alert->validate) {
                return response(['data'=>"Airtime has been validated"]);
            }
            else {
                return response("Airtime rejected for validation!.", 422);
            }

//            }

//            return response('Airtime already validated!.', 403);
        }

        return response('Unauthorized', 403);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function recommendScheduledAirtime($id, Request $request)
    {
        $alert = ScheduleAlert::find($id);

        if(!$alert){
            return response('not found', 403);
        }

        if($this->user->is('head.accounting') /*$this->user->canRecommendApproval()*/) {

//            if(!$alert->recommend) {
            if(!$alert->validate && $alert->validate_signed) {
                return response('Airtime has been rejected for validation!.', 403);
            }

            if(!$alert->validate && !$alert->validate_signed) {
                return response('Airtime has not been validated!.', 403);
            }

            $alert->mail = ScheduleAlert::RECOMMENDED; //to disable cron jobs for sending recommendations
            $alert->recommend = $request->get('recommend');
            $alert->recommend_signed = Carbon::now();
            $alert->recommended_by = $this->user->id;

            $alert->save();

            //send notification mail
            //admin and ED receives the mail for approval
            $this->sendEmailNotification($alert);

            if($alert->recommend) {
                return response(['data'=>'Airtime successfully recommended for approval']);
            }
            else {
                return response('Airtime not recommended for approval', 422);
            }

        }

        return response('Unauthorized', 403);

    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function approveScheduledAirtime($id, Request $request)
    {
        $alert = ScheduleAlert::find($id);

        if(!$alert){
            return response('not found', 403);
        }

        if($this->user->is('admin|executive.director')/*$this->user->canApproveAirtime()*/) {

//            if(!$alert->approved_signed) {

            if(!$alert->validate && !$alert->validate_signed) {
                return response('Airtime has not been validated!.', 403);
            }

            if(!$alert->recommend && $alert->recommend_signed) {
                return response('Airtime has been rejected for recommendation!.', 403);
            }

            $alert->mail = ScheduleAlert::APPROVED; //to disable cron jobs from seding message to admin and ED
            $alert->approved = $request->get('approved');
            $alert->approved_signed = Carbon::now();
            $alert->approved_by = $this->user->id;

            $alert->save();

            //send notification mail
            //Traffic receives the mail for programme
            $this->sendEmailNotification($alert);

            if($alert->approved) {
                return response(['data'=>'Airtime successfully approved for programme']);
            }
            else {
                return response('Airtime denied for approval!.', 422);
            }
//            }
//
//            return response('Airtime already approved', 403);
        }

        return response('Unauthorized', 403);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function programmesScheduledAirtime($id, Request $request)
    {
        $alert = ScheduleAlert::find($id);

        if(!$alert){
            return response('not found', 403);
        }

        if($this->user->is('traffic') /*&& $this->user->canProgrammesAirtimeApproved()*/) {

//            if(!$alert->programme) {

                if(!$alert->approved && !$alert->approved_signed) {
                    return response('Airtime has not been approved!.', 403);
                }
                else if(!$alert->approved && $alert->approved_signed){
                    return response('Airtime has been denied for approval!.', 403);
                }

                $alert->mail = ScheduleAlert::PROGRAMMED; //to disable cron jobs for unprogrammed airtime
                $alert->programme = $request->get('programme');
                $alert->programme_signed = Carbon::now();
                $alert->programmed_by = $this->user->id;

                $alert->save();

                //No mail is sent here
                $this->sendEmailNotification($alert);

                if($alert->programme) {

                    return response(['data'=>'Airtime saved for programme']);
                }
                else {
                    return response('Airtime rejected for programme', 422);
                }
//            }
//
//            return response('Airtime already saved for programme', 403);
//
        }

        return response('Unauthorized', 403);

    }

    /**
     * @param $alert
     */
    protected function sendEmailNotification($alert)
    {
        $schedule = Schedule::find($alert->schedule_id);
        $schedule->scheduleAlert->toArray();
        $schedule->client->toArray();
//        $schedule->subscriptions->toArray();
//
//        foreach ($schedule->subscriptions as $subscription) {
//            $subscription->product->toArray();
//            $det = $subscription->details->toArray();
//
//            foreach ($det as $d) {
//                $subscription->totalAmount += $d['amount'];
//                $subscription->totalSubChargePrice += $d['subChargePrice'];
//            }
//
//            $schedule->broadcasts += count($det);
//        }

        //check listeners to understand hot it works
        Event::fire(new ScheduleHasBeenPlaced($schedule));
    }


    protected function processSubscriptionAttachments(&$schedule, &$productSub, &$sub_attachment, &$uploads)
    {
        foreach ($sub_attachment as $file) {
            $ext = '.unknown';
            $x = explode('.', $file['filename']);
            if (count($x)) {
                $ext = $x[count($x) - 1];
            }
            $filename = sha1(str_shuffle($file['filename']).time(0)) . '.' . $ext;
            $filetype = $file['filetype'];
            $filesize = $file['filesize'];
            $path = storage_path() . '/app/public/airtime/' . $filename;
//                                $fh = fopen($path, 'w');
//                                fwrite($fh, base64_decode($file['base64']));
            file_put_contents($path, base64_decode($file['base64']));
            SubscriptionAttachment::create([
                'schedule' => $schedule->id,
                'schedule_product_sub' => $productSub->id,
                'filename' => $filename,
                'filesize' => $filesize,
                'filetype' => $filetype
            ]);
            $uploads[] = $path;
        }

        return $uploads;
    }

    /**
     * @param $uploads
     */
    protected function cleanUploadsOnError(&$uploads)
    {
        foreach ($uploads as $upload) {
            if (file_exists($upload)) {
                unlink($upload);
            }
        }
    }


    /**
     * @param $subscription
     * @param $myProduct
     * @param $schedule
     * @param $uploads
     */
    protected function processSubscription(&$subscription, &$schedule, &$myProduct,  &$uploads)
    {
        //check if some slot are fixed.....
        if (!empty($subscription['schedule'])) {
            $sub_schedule = $subscription['schedule']; //copy
            unset($subscription['schedule']); //remove it from sub array
        }

        //check if subscription has attachment
        if (!empty($subscription['attachment'])) {
            $sub_attachment = $subscription['attachment'];
            unset($subscription['attachment']); //remove it from sub array
        }

        //create sub
        $productSub = ScheduleProductSub::create([
            'schedule_product_id' => $myProduct->id,
            'subscription' => $subscription
        ]);

        //process save attachments
        if (isset($sub_attachment)) {
            $this->processSubscriptionAttachments($schedule, $productSub, $sub_attachment, $uploads);
        }


        //then if slot are fixed save it to sub details table
        if (!empty($sub_schedule)) {
            ScheduleProductSubDetail::create([
                'schedule_product_sub_id' => $productSub->id,
                'schedule' => $sub_schedule
            ]);

            unset($sub_schedule);
        }
    }


}
