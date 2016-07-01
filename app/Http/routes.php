<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Client;
use App\Events\ScheduleHasBeenPlaced;
use App\Events\SendReportToMailbox;
use App\Schedule;
use App\ScheduleAlert;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;


//Route::get('reserve', function() {
//
////    return \Carbon\Carbon::now()->addMinute(20);
//
//    $notApproved = ScheduleAlert::whereNull('approved_signed')->get();
//
//
////    $notApproved->each(function($item, $key) {
////
////        if(Carbon\Carbon::now() > $item->resend_at) {
////
////        $schedule = Schedule::find($item->schedule_id);
//        $schedule = Schedule::find(35);
//        $schedule->scheduleAlert->toArray();
//        $schedule->client->toArray();
//        $schedule->subscriptions->toArray();
//
//        foreach ($schedule->subscriptions as $subscription) {
//            $subscription->product->toArray();
//            $det = $subscription->details->toArray();
//
//            foreach($det as $d) {
//                $subscription->totalAmount += $d['amount'];
//                $subscription->totalSubChargePrice += $d['subChargePrice'];
//            }
//
//            $schedule->broadcasts += count($det);
//        }
//
//    $schedule->bg_colour = 'lightgrey';
//
//    if($schedule->scheduleAlert->validate) {
//        $schedule->bg_colour = 'gold';
//    }
//
//    if ($schedule->scheduleAlert->recommend) {
//        $schedule->bg_colour = 'Orange';
//    }
//
//    if($schedule->scheduleAlert->approved) {
//        $schedule->bg_colour = 'lightgreen';
//    }
//
//    if (!$schedule->scheduleAlert->approved && $schedule->scheduleAlert->approved_signed) {
//        $schedule->bg_colour = 'red';
//    }
//
//    if($schedule->scheduleAlert->programme) {
//        $schedule->bg_colour = 'paleturquoise';
//    }
//
////    else {
////        //default
////        $schedule->bg_colour = 'lightgrey';
////    }
//
//
////            Event::fire(new ScheduleHasBeenPlaced($schedule));
////        }
//
////    });
//
//    $user = (object) ['email' => 'fashtop3@gmail.com'];
//    $subject = 'Airtime Order has been submitted-- head of marketing';
//    $view = 'emails.airtime';
//    $data = [];
//
//    return view('emails.airtime', compact('schedule'));
//
//});

//Route::get('report', function() {
//
//    $report = App\Report::find(5);
//    $report->user->toArray();
//    $report->tasks->toArray();
//    $report->challenges->toArray();
//    $report->remittances->toArray();
//    $report->reportVehicles->toArray();
//
//    $taskCount = 0;
//    $challengeCount = 0;
//
//    $report['taskCount'] = 0;
//    $report['challengeCount'] = 0;
////    Event::fire(new SendReportToMailbox($report));
//
////    Mail::send('emails.reports', ['report'  => $report, 'taskCount' => $taskCount, 'challengeCount' => $challengeCount], function($message) {
////        $message->to('fashtop3@gmail.com');
////    });
//
//    return view('emails.reports', compact('report', 'taskCount', 'challengeCount'));
//});

Route::get('notification', function() {

    $lastname = "Fashola";
    $link = "http://".$_SERVER['HTTP_HOST']."/recover/change?e=".urlencode('fashtop3@gmail.com')."&m=".urlencode('$sfewinjq9ii830288');
    return view('emails.reset', compact('lastname', 'link'));
});

Route::get('mail/airtime', function() {
    return view('emails.airtime');
});


Route::get('api/contacts', 'UserController@contacts');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web'] ], function () {

    Route::get('api/csrf', function() {
        return csrf_token();
    });

    Route::post('/api/auth',    'UserController@checkAuth');
    Route::get('/api/auth/check',    'UserController@isAuth');

    Route::get('/api/auth/logout',    'UserController@logoutUser');
//    Route::get('/api/auth/logout',    'Auth\AuthController@logout');

    //user routing
    Route::post('/api/user/{id}/upload', 'UserController@upload');
//    Route::post('/api/user/{id}', 'UserController@update');
    Route::post('/api/user/recover', 'UserController@recover');
    Route::put('/api/user/recover', 'UserController@changePassword');
    Route::get('/api/user/marketers', 'UserController@getMarketers');

    //check user permissions
    Route::get('/api/user/can/{slug}', 'UserController@userCan');
    Route::get('/api/user/is/{slug}', 'UserController@userIs');

    Route::resource('/api/user', 'UserController');

    Route::post('/api/client/{id}', 'ClientController@update');
    Route::resource('/api/client', 'ClientController');

    Route::resource('/api/role', 'RoleController');
    Route::resource('/api/permission/controls', 'PermissionController@controls');
    Route::resource('/api/permission', 'PermissionController');

    Route::resource('/api/marketer', 'MarketerController');
    Route::get('/api/product', 'ProductController@index');

    Route::post('/api/mail/mailout', 'MailController@sendCustomMail');

    //airtime validation
    Route::post('/api/airtime/{id}/validate', 'AirtimeController@validateScheduledAirtime');
    Route::post('/api/airtime/{id}/recommend', 'AirtimeController@recommendScheduledAirtime');
    Route::post('/api/airtime/{id}/approve', 'AirtimeController@approveScheduledAirtime');
    Route::post('/api/airtime/{id}/programme', 'AirtimeController@programmesScheduledAirtime');

    Route::resource('/api/airtime', 'AirtimeController');

    //vehicle and driver's report
    Route::resource('/api/driver/report', 'DriverController');
    Route::resource('/api/vehicle', 'VehicleController');

    //target and staff controlls
    Route::get('/api/target/user', 'TargetController@getMyTargets');
    Route::get('/api/target/{user_id}/user', 'TargetController@getUserTargets');
    Route::resource('/api/target', 'TargetController');

    Route::resource('/api/report', 'ReportController');

    Route::get('pdf/{id}/airtime', 'PDFController@airtimePDF');

});

//Route::filter('api.csrf', function($route, $request)
//{
//    if (Session::token() != $request->header('X-Csrf-Token') )
//    {
//        return Response::json('CSRF does not match', 400);
//    }
//});

//Route::controllers([
//    'auth' => 'Auth\AuthController',
//    'password' => 'Auth\PasswordController',
//]);