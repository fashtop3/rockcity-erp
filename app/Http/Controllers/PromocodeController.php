<?php

namespace App\Http\Controllers;

use App\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class PromocodeController extends Controller
{
    protected $promocode;

    public function __construct()
    {
        $this->promocode = new Promocode();
    }

    public function generate()
    {
        $p = new Promocode();
//        $p->generateAndSave(100, 10, 'DISCOUNT', Carbon::now()->addDays(20), 5);

        $c = $p->reward('RFXU-ZXWT');
    }

    public function gerReward(Request $request)
    {
        $action = $request->get('action');
        $code = $request->get('code');

        try{
            if($action == 'discount') {
                if($this->promocode->check($code, $action)) {
                    return response($this->promocode->reward($code));
                }
                else {
                    return response('Discount code invalid', 403);
                }
            }
            else if($action == 'coupon') {
                if($this->promocode->check($code, $action)) {
                    return response($this->promocode->reward($code));
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
