<?php

namespace App\Http\Controllers\Airtime;

use App\Models\Airtime\Product;
use App\Models\Airtime\ProductTime;
use App\Models\Airtime\Promocode;
use App\Models\Airtime\Schedule;
use App\Models\Client;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;

class GenerateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {


        if($request->get('min') && $request->get('max')) {

            $orders = auth()->user()->schedules()
                ->latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->currentUser()
                ->with('user')
                ->with('client')
                ->with('alert')
                ->paginate(100);
        }
        else {
            $orders = auth()->user()->schedules()
                ->currentUser()
                ->with('user')
                ->with('client')
                ->with('alert')
                ->paginate(100);
        }


        return view('main.airtime.index')->with(['orders' => $orders]);//
    }

    public function admin_index(Request $request)
    {

        if($request->get('min') && $request->get('max')) {

            $orders = Schedule::latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->with('user')
                ->with('client')
                ->with('alert')
                ->paginate(100);
        }
        else {
            $orders = Schedule::latest()
                ->with('user')
                ->with('client')
                ->with('alert')
                ->paginate(100);
        }


        return view('main.airtime.admin-index')->with(['orders' => $orders]);//
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $products = Product::with('prices')->get();
        $time = ProductTime::first();

        $step = $request->get('step', 0);
        if($step < 0 || $step > 4) $step = 0;

        return view('main.airtime.create')->with(['products' => $products, 'prog_time' => $time, 'step' => $step]);
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
        try{
            DB::beginTransaction();

            //Todo: add marketer_id to schedule migration

            $data = $request->all();
            $data['order_no'] = time();
            //create schedule
            if($schedule = auth()->user()->schedules()->create($data)) {
                $schedule->setOrderNo();

                if(!empty(json_decode($data['promocode'])->discount))
                    Promocode::apply(json_decode($data['promocode'])->discount);
                if(!empty(json_decode($data['promocode'])->coupon))
                    Promocode::apply(json_decode($data['promocode'])->coupon);

                $items = $data['items'];
                foreach($items as $item) {
                    $product = json_decode($item);
                    $product->product_id = $product->product;
                    foreach($product->subscriptions as &$subscription) {
                        if($subscription->file_id && $request->hasFile($subscription->file_id)) {
                            if ($request->file($subscription->file_id)->isValid()) {
                                $filename = $request->{$subscription->file_id}->store('airtime/subscriptions');
                                $subscription->file_id = $filename;
                            }
                        }
                    }
                    $schproduct = $schedule->products()->create((Array)$product);
                }

                //create alert for cron jobs
                $schedule->alert()->create(['token' => bcrypt(Carbon::now())]);

                DB::commit();

                /**
                 * this will only invoke mail-server in production mode
                 */
                if(!Config::get('app.debug')){
                    try{
                        //Todo: event handling for mail notifications
//                        Event::fire(new ScheduleHasBeenPlaced($schedule));
                    }
                    catch(\Exception $e) {
//                        $this->cleanUploadsOnError($uploads);
//                        return response('Error: Mail Server not reachable! try again or contact Administrator', 403);
                    }
                }

                Session::flash('message', 'Your Order has been submitted for review');
            }
        }
        catch(\Exception $e) {
            dd($e->getMessage());
        }

        return redirect()->route('airtime.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        try {
            $order = Schedule::findOrFail($id);
        }
        catch(\Exception $e) {

            return redirect()->route('airtime.orders');
        }

        return view('main.airtime.show')->with(['order' => $order]);//
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

    public function topdf($id)
    {
        try {
            $order = Schedule::findOrFail($id);
        }
        catch(\Exception $e) {

            return redirect()->route('airtime.orders');
        }

        return view('main.airtime.pdf')->with(['order' => $order]);//


        $pdf = PDF::loadView('pdf.airtime', compact('schedule'));
        return $pdf->stream('airtime_order.pdf');
    }
}
