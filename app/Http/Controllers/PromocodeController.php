<?php

namespace App\Http\Controllers;

use App\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class PromocodeController extends Controller
{

    public function generate()
    {
//        $p = Promocode::generateAndSave(100, 10, 'DISCOUNT', Carbon::now()->addDays(20), 5);
        $p = Promocode::generate(100);
        return response($p);
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
