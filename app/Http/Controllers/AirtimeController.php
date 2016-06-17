<?php

namespace App\Http\Controllers;

use App\Client;
use App\Events\ScheduleHasBeenPlaced;
use App\Schedule;
use App\ScheduleAlert;
use App\ScheduleDetail;
use App\ScheduleSub;
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
        $this->middleware('auth.basic');

        $this->user = Auth::user();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request)
    {

        if($request->get('min') && $request->get('max')) {

            $schedules = Schedule::latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->currentUser()->get();
        }
        else {
            $schedules = Schedule::latest()
                ->currentUser()->get();
        }


        if(!$schedules) {
            return response('Order empty', 403);
        }

        foreach($schedules as $schedule)
        {
        //    $schedule['orderNo'] = Schedule::orderNo($schedule->created_at->format('n'), $schedule->id);
            $schedule->user->toArray();
            $schedule->client->toArray();
            $schedule->subscriptions->toArray();
            $schedule->scheduleAlert->toArray();

//            foreach($schedule->subscriptions as $subscription) {
//                $subscription->product->toArray();
//                $det = $subscription->details->toArray();
//                $schedule->detailsCount += count($det);
//            }
        }


//        $schedules = DB::table('schedules')
//            ->join('schedule_alerts', 'schedules.id', '=', 'schedule_alerts.schedule_id')
//            ->join('users', 'schedules.user_id', '=', 'users.id')
////            ->whereNull('schedule_alerts.approved_signed')
//            ->select('schedule_alerts.*', 'schedules.*', DB::raw("DATE_FORMAT(schedules.created_at, '%b %d, %Y %h:%i %p') As created"),
//                'users.lastname', 'users.firstname')
//            ->get();

//        ->paginate(2);

        return response($schedules);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

//        dd($request->all());

        DB::beginTransaction();

        $client = $request->get('client');
        $marketer = $request->get('marketer');
        $cart = $request->get('cart');

        $marketer = User::find($marketer['id']);
        $client = Client::find($client['id']);

        $airtimeSchedule = $request->get('sub');
        $airtimeSchedule['user_id'] = $marketer->id;
        $airtimeSchedule['client_id'] = $client->id;

        //create schedule
        if($schedule = Schedule::create($airtimeSchedule)) {

            foreach($cart as $product){

                $airtimeScheduleSub['schedule_id'] = $schedule->id;
                $airtimeScheduleSub['product_id'] = $product['id'];

                $productSub = ScheduleSub::create(['schedule_id' => $schedule->id, 'product_id' => $product['id']]);

                foreach($product['subscriptions'] as $subscription) {

                    $subscription['schedule_id'] = $schedule->id;
                    $subscription['schedule_sub_id'] = $productSub->id;
                    ScheduleDetail::create($subscription);
                }

            }

            ScheduleAlert::create(['schedule_id' => $schedule->id, 'token' => bcrypt(Carbon::now())]);

            $schedule['order_no'] = Schedule::orderNo(Carbon::now()->format('n'), $schedule->id);
            $schedule->save();

            //mail out the invoice
            Event::fire(new ScheduleHasBeenPlaced($schedule));


            DB::commit();
            return response('Order submitted successfully');
        }

        return response('Order processing failed', 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schedule = Schedule::find($id);

        if(!$schedule) {
            return response('Airtime not found', 403);
        }

        $schedule->user->toArray();
        $schedule->client->toArray();
        $schedule->subscriptions->toArray();

        foreach($schedule->subscriptions as $subscription) {
            $subscription->product->toArray();

            $det = $subscription->details->toArray();

            foreach($det as $d)
                $subscription['totalAmount'] += $d['amount'];
            $subscription['totalAmount'] += $d['subChargePrice'];
        }

        $schedule->scheduleAlert->toArray();

        return response($schedule);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
                return response("Airtime has been validated");
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
                return response('Airtime successfully recommended for approval');
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
                return response('Airtime successfully approved for programme');
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

                    return response('Airtime saved for programme');
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
        $schedule->subscriptions->toArray();

        foreach ($schedule->subscriptions as $subscription) {
            $subscription->product->toArray();
            $det = $subscription->details->toArray();

            foreach ($det as $d) {
                $subscription->totalAmount += $d['amount'];
                $subscription->totalSubChargePrice += $d['subChargePrice'];
            }

            $schedule->broadcasts += count($det);
        }

        //check listeners to understand hot it works
        Event::fire(new ScheduleHasBeenPlaced($schedule));
    }


}
