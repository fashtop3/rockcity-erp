<?php

namespace App\Http\Controllers\Airtime;

use App\Http\Requests\PromocodeStoreRequest;
use App\Models\Airtime\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class PromocodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.coupon.create');
    }


    /**
     * @param PromocodeStoreRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function store(PromocodeStoreRequest $request)
    {
        $amount = $request->get('amount');
        $reward = $request->get('reward');
        $type = $request->get('type');
        $quantity = $request->get('quantity');
        $expiry_date = $request->get('expiry_date') && Carbon::today()<Carbon::parse($request->get('expiry_date')) ? Carbon::parse($request->get('expiry_date')):null;

        DB::beginTransaction();
        try{
            $coupon = Promocode::generateAndSave($amount, $reward, $type, $expiry_date, $quantity);
            $ty = $type == 'COUPON' ? 'Commission':ucfirst($type);
            $subject = $ty.' Coupon Generation Report @ '.Carbon::now()->toDateTimeString();
            $csv = $this->getCSVCoupon($coupon);
            try{
                //Todo: add event listeners
//                Event::fire(new CouponGeneratedEvent(['subject'=> $subject, 'coupon'=>$csv]));
                DB::commit();
                Session::flash('success', 'Coupon has been forwarded to your mail.');
            }
            catch(\Exception $e) {
                Session::flash('error', 'Mail server not reachable try again');
                return redirect()->back()->withInput();
            }
        }
        catch(\Exception $e) {
            Session::flash('error', 'Coupon code generation failed contact site Administrator');
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    protected function getCSVCoupon($result) {
        $csv = 'ID,TYPE,CODE,REWARD,QUANTITY,EXPIRY'."\n";
        $result = $result->toArray();
        array_walk($result, function($coupon) use(&$csv) {
            if($coupon['type']=='COUPON') {$coupon['type'] = 'COMMISSION';}
            $csv .= "\"{$coupon['id']}\",\"{$coupon['type']}\",\"{$coupon['code']}\",\"{$coupon['reward']}\",\"{$coupon['quantity']}\",\"{$coupon['expiry_date']}\"";
            $csv .= "\n";
        });

        return $csv;
    }

    public function getReward(Request $request)
    {
        $action = $request->get('action');
        $code = $request->get('code');

        try{
            if($action == 'discount') {
                if(Promocode::check($code, $action)) {
                    return response([ 'data'=> Promocode::reward($code)]);
                }
                else {
                    return response('Coupon code invalid', 403);
                }
            }
            else if($action == 'coupon') {
                if(Promocode::check($code, $action)) {
                    return response([ 'data'=> Promocode::reward($code)]);
                }
                else {
                    return response('Coupon code invalid', 403);
                }
            }
        }
        catch(\Exception $e) {
            return response('invalid request', 403);
        }

        return response('invalid request', 403);
    }
}
