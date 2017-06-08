<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;

/*
 * Load login page
 */
Route::get('/', function () {
    if(Auth::check()) {
        return redirect()->route('dashboard');
    }
    return view('auth.login');
});

/*
 * check for app route and redirect to dashboard
 */
Route::get('/app', function() { return redirect()->route('dashboard'); });

/*
 * Do for password recovery
 */
Route::get('/recover', "RecoverController@create")->name('user_recover');


/**
 * Manage authenticated user
 */
Route::group(['prefix' => 'app', 'middleware' => ['auth', 'GV']], function() {
    Route::get('/dashboard', 'Main\DashboardController@index')->name('dashboard');
    Route::get('/profile/{id}', 'Main\UserController@edit')->name('profile');
    Route::post('/profile/{id}', 'Main\UserController@update')->name('profile');
    Route::get('/mail', 'Main\MailController@create')->name('mail');
    Route::post('/mail', 'Main\MailController@sendCustomMail')->name('mail');
    Route::get('/sms', 'Main\SMSController@create')->name('sms');
    Route::post('/sms', 'Main\SMSController@sendCustomSMS')->name('sms');

    //client
    Route::get('/client', 'Main\ClientController@index')->name('client');
    Route::get('/client-data', 'Main\ClientController@data');
    Route::get('/client/{id}/edit', 'Main\ClientController@show')->name('client.edit');
    Route::post('/client/{id}/edit', 'Main\ClientController@update')->name('client.edit');
    Route::get('/client/{id}/destroy', 'Main\ClientController@destroy')->name('client.destroy');

    Route::get('/client/create', 'Main\ClientController@create')->name('client.create');
    Route::post('/client/create', 'Main\ClientController@store')->name('client.create');

    //airtime
    Route::get('/airtime/orders', 'Airtime\GenerateController@index')->name('airtime.orders');
    Route::get('/airtime/orders/{id}', 'Airtime\GenerateController@show')->name('airtime.show');
    Route::get('/airtime/create', 'Airtime\GenerateController@create')->name('airtime.create');
    Route::post('/airtime/create', 'Airtime\GenerateController@store')->name('airtime.create');
    Route::get('/airtime/{id}/pdf', 'Airtime\GenerateController@topdf')->name('airtime.topdf');

    Route::get('/api/promocode/reward', 'Airtime\PromocodeController@getReward');

    //report
    Route::get('/report/staff', 'Main\StaffReportController@index')->name('report.staff');
    Route::get('/report/staff/create', 'Main\StaffReportController@create')->name('report.staff.create');
    Route::post('/report/staff/create', 'Main\StaffReportController@store')->name('report.staff.create');

    Route::get('/report/driver', 'Main\DriverReportController@index')->name('report.driver');
    Route::get('/report/driver/create', 'Main\DriverReportController@create')->name('report.driver.create');
    Route::post('/report/driver/create', 'Main\DriverReportController@store')->name('report.driver.create');
    Route::get('/report/driver/{id}/edit', 'Main\DriverReportController@show')->name('report.driver.edit');
    Route::post('/report/driver/{id}/edit', 'Main\DriverReportController@update')->name('report.driver.edit');
    Route::get('/report/driver/{id}/destroy', 'Main\DriverReportController@destroy')->name('report.driver.destroy');


    Route::get('/assessment', 'Assessment\AssessmentController@index')->name('assessment');
    Route::get('/assessment/create', 'Assessment\AssessmentController@create')->name('assessment.create');
    Route::post('/assessment/create', 'Assessment\AssessmentController@store')->name('assessment.create');
    Route::get('/assessment/{id}/edit', 'Assessment\AssessmentController@edit')->name('assessment.edit');
    Route::post('/assessment/{id}/edit', 'Assessment\AssessmentController@update')->name('assessment.edit');
    Route::get('/assessment/{id}/destroy', 'Assessment\AssessmentController@destroy')->name('assessment.destroy');

    Route::get('/assessment/{id}/preview', 'Assessment\SupervisorController@show')->name('assessment.supervise');
    Route::get('/assessment/{id}/comment', 'Assessment\SupervisorController@create')->name('assessment.comment');
    Route::post('/assessment/{id}/comment', 'Assessment\SupervisorController@store')->name('assessment.comment');
    Route::get('/assessment/{id}/comment/edit', 'Assessment\SupervisorController@edit')->name('assessment.comment.edit');
    Route::post('/assessment/{id}/comment/edit', 'Assessment\SupervisorController@update')->name('assessment.comment.edit');


    /*
     * Admin routes
     */
    Route::group(['prefix'=>'admin'], function() {

        Route::get('/assessment/logs', 'Assessment\AssessmentConfigController@index')->name('assessment.log');
        Route::get('/assessment/logs/create', 'Assessment\AssessmentConfigController@create')->name('assessment.log.create');
        Route::post('/assessment/logs/create', 'Assessment\AssessmentConfigController@store')->name('assessment.log.create');
        Route::get('/assessment/logs/{id}/edit', 'Assessment\AssessmentConfigController@edit')->name('assessment.log.edit');
        Route::post('/assessment/logs/{id}/edit', 'Assessment\AssessmentConfigController@update')->name('assessment.log.edit');
        Route::get('/assessment/logs/{id}/data', 'Assessment\AssessmentConfigController@data')->name('assessment.log.data');
        Route::get('/assessment/logs/{id}/destroy', 'Assessment\AssessmentConfigController@destroy')->name('assessment.log.destroy');

        Route::get('/client', 'Main\ClientController@adminIndex')->name('admin.client');

        //people route
        Route::get('/people', 'Main\AdminUserController@index')->name('admin.people');
        Route::get('/people/create', 'Main\AdminUserController@create')->name('admin.people.create');
        Route::post('/people/create', 'Main\AdminUserController@store')->name('admin.people.create');
        Route::get('/people/{id}/edit', 'Main\AdminUserController@edit')->name('admin.people.edit');
        Route::post('/people/{id}/edit', 'Main\AdminUserController@update')->name('admin.people.edit');
        Route::get('/people/{id}/delete', 'Main\AdminUserController@destroy')->name('admin.people.destroy');

        //vehicle route
        Route::get('/vehicle', 'RCAdmin\VehicleController@index')->name('admin.vehicle');
        Route::get('/vehicle/create', 'RCAdmin\VehicleController@create')->name('admin.vehicle.create');
        Route::post('/vehicle/create', 'RCAdmin\VehicleController@store')->name('admin.vehicle.create');
        Route::get('/vehicle/{id}/edit', 'RCAdmin\VehicleController@edit')->name('admin.vehicle.edit');
        Route::post('/vehicle/{id}/edit', 'RCAdmin\VehicleController@update')->name('admin.vehicle.edit');
        Route::get('/vehicle/{id}/delete', 'RCAdmin\VehicleController@destroy')->name('admin.vehicle.destroy');

        //target route
        Route::get('/target', 'RCAdmin\TargetController@index')->name('admin.target');
        Route::get('/target/create', 'RCAdmin\TargetController@create')->name('admin.target.create');
        Route::post('/target/create', 'RCAdmin\TargetController@store')->name('admin.target.create');
        Route::get('/target/{id}/edit', 'RCAdmin\TargetController@edit')->name('admin.target.edit');
        Route::post('/target/{id}/edit', 'RCAdmin\TargetController@update')->name('admin.target.edit');
        Route::get('/target/{id}/delete', 'RCAdmin\TargetController@destroy')->name('admin.target.destroy');
    });

});

Auth::routes();

