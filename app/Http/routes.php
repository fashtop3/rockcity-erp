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


Route::get('/', function() {
//    header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
//    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
//    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
//    header("Cache-Control: post-check=0, pre-check=0", false);
//    header("Pragma: no-cache");
    return view('app');
});

//Route::get('/example', [
//    'as' => 'example',
//    'uses' => 'VehicleController@index',
//]);


//Route::get('reserve', function() {
//
////    return \Carbon\Carbon::now()->addMinute(20);
//
////    $notApproved = ScheduleAlert::whereNull('approved_signed')->get();
//
//
////    $notApproved->each(function($item, $key) {
////
////        if(Carbon\Carbon::now() > $item->resend_at) {
////
////        $schedule = Schedule::find($item->schedule_id);
//        $schedule = Schedule::find(4);
//        $schedule->scheduleAlert->toArray();
//        $schedule->client->toArray();
////        $schedule->subscriptions->toArray();
//
////        foreach ($schedule->subscriptions as $subscription) {
////            $subscription->product->toArray();
////            $det = $subscription->details->toArray();
////
////            foreach($det as $d) {
////                $subscription->totalAmount += $d['amount'];
////                $subscription->totalSubChargePrice += $d['subChargePrice'];
////            }
////
////            $schedule->broadcasts += count($det);
////        }
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
Route::get('/login', function() {
    return redirect('/');
});

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

Route::get('/promocode/generate', 'PromocodeController@generate');
Route::get('/promocode/reward', 'PromocodeController@getReward');

Route::group(['middleware' => ['web'] ], function () {

    Route::get('pdf/{id}/airtime', 'PDFController@airtimePDF');

    /**
     * Add prefix 'api' to url
     */
    Route::group(['prefix' => 'api'], function() {
        Route::get('/csrf', function() {return csrf_token();});

        Route::post('/auth',    'UserController@checkAuth');
//        Route::post('/auth',    'Auth\AuthController@login');
        Route::get('/auth/check',    'UserController@isAuth');

        Route::get('/auth/logout',    'Auth\AuthController@logout');
//    Route::get('/auth/logout',    'Auth\AuthController@logout');

        //user routing
        Route::put('/user/{id}/edit', 'UserController@update');
//    Route::post('/user/{id}/upload', 'UserController@upload');
        Route::post('/user/recover', 'UserController@recover');
        Route::put('/user/recover', 'UserController@changePassword');
        Route::get('/user/marketers', 'UserController@getMarketers');

        //check user permissions
        Route::get('/user/permissions', 'UserController@userPermissions');

        Route::resource('/user', 'UserController');

        Route::put('/client/{id}/edit', 'ClientController@update');
        Route::resource('/client', 'ClientController');

        Route::resource('/role', 'RoleController');
        Route::resource('/permission/controls', 'PermissionController@controls');
        Route::resource('/permission', 'PermissionController');

        Route::resource('/marketer', 'MarketerController');
        Route::get('/product', 'ProductController@index');

        Route::post('/mail/mailout', 'MailController@sendCustomMail');

        //airtime validation
        Route::post('/airtime/{id}/validate', 'AirtimeController@validateScheduledAirtime');
        Route::post('/airtime/{id}/recommend', 'AirtimeController@recommendScheduledAirtime');
        Route::post('/airtime/{id}/approve', 'AirtimeController@approveScheduledAirtime');
        Route::post('/airtime/{id}/programme', 'AirtimeController@programmesScheduledAirtime');

        Route::resource('/airtime', 'AirtimeController');

        //vehicle and driver's report
        Route::resource('/driver/report', 'DriverController');
        Route::resource('/vehicle', 'VehicleController');

        //target and staff controls
        Route::get('/target/user', 'TargetController@getMyTargets');
        Route::get('/target/{user_id}/user', 'TargetController@getUserTargets');
        Route::resource('/target', 'TargetController');

        Route::post('api/rep/files', 'ReportController@upload');
        Route::resource('/report', 'ReportController');

        //assessments
        Route::get('/activeconfig', 'AssessmentConfigController@getActive');
        Route::resource('/assessconfig', 'AssessmentConfigController');
        Route::get('/assessment/records/{id}', 'AssessmentController@records');
        Route::resource('/assessment', 'AssessmentController');
        Route::resource('/supervisor', 'SupervisorController');

        Route::get('/admin/airtime', 'AdminController@getOrders');
        Route::get('/admin/driver-reps', 'DriverController@getReports');
        Route::get('/admin/staff-reps', 'ReportController@getReports');
        Route::get('/admin/clients', 'ClientController@getAllClients');
        Route::put('/admin/user/{id}', 'UserController@profileUpdateByAdmin');

        Route::post('/promocode/generate', 'PromocodeController@generate');
        Route::get('/promocode/reward', 'PromocodeController@getReward');

    });
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