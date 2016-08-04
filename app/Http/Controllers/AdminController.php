<?php

namespace App\Http\Controllers;

use App\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function getOrders(Request $request) {
        if($request->get('min') && $request->get('max')) {

            $schedules = Schedule::all()
                ->latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->currentUser()->get();
        }
        else {
            $schedules = Schedule::all()
                ->latest()
                ->currentUser()->get();
        }


        if(!$schedules) {
            return response('Order empty', 403);
        }

        foreach($schedules as $schedule)
        {
            $schedule->user->toArray();
            $schedule->client->toArray();
            $schedule->scheduleAlert->toArray();
        }


        return response($schedules);
    }
}
