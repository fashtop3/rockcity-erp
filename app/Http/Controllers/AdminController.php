<?php

namespace App\Http\Controllers;

use App\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.basic');
        $this->middleware('role:admin|executive.director|administration.dept', ['only' => ['getOrders']]);
    }

    public function getOrders(Request $request) {
        if($request->get('min') && $request->get('max')) {

            $schedules = Schedule::latest()
                ->search(Carbon::parse($request->get('min'))->toDateTimeString(), Carbon::parse($request->get('max'))->toDateTimeString())
                ->get();
        }
        else {
            $schedules = Schedule::latest()->get();
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
