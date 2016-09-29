<?php

namespace App\Http\Controllers;

use App\Events\CouponGeneratedEvent;
use App\Http\Requests\PromocodeGenReq;
use App\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class PromocodeController extends Controller
{

    public function generate(PromocodeGenReq $request)
    {
        $amount = $request->get('amount');
        $reward = $request->get('reward');
        $type = $request->get('type');
        $quantity = $request->get('quantity');
        $expiry_date = $request->get('expiry_date') && Carbon::today()<$request->get('expiry_date') ? $request->get('expiry_date'):null;

        DB::beginTransaction();
        try{
            $coupon = Promocode::generateAndSave($amount, $reward, $type, $expiry_date, $quantity);
            $subject = 'Coupon Generation Report @ '.Carbon::now()->toFormattedDateString();
            $csv = $this->getCSVCoupon($coupon);
            Event::fire(new CouponGeneratedEvent(['subject'=> $subject, 'coupon'=>$csv]));
            DB::commit();
            return response(['data'=>'Coupon has been forwarded to your mail.']);
        }
        catch(\Exception $e) {
            return response('Coupon code generation failed', 403);
        }
    }

    protected function getCSVCoupon($result) {
        $csv = 'ID,TYPE,CODE,REWARD,QUANTITY,EXPIRY'."\n";
        $result = $result->toArray();
        array_walk($result, function($coupon) use(&$csv) {
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

    public function apply()
    {
        return response(Promocode::apply('RFXU-ZXWT', true));
    }
}
