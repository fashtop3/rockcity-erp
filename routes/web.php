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
    Route::post('/client/{id}/destroy', 'Main\ClientController@show')->name('client.destroy');

    Route::get('/client/create', 'Main\ClientController@create')->name('client.create');
    Route::post('/client/create', 'Main\ClientController@store')->name('client.create');

    //airtime
    Route::get('/airtime/orders', 'Airtime\GenerateController@index')->name('airtime.orders');
    Route::get('/airtime/orders/{id}', 'Airtime\GenerateController@show')->name('airtime.show');
    Route::get('/airtime/create', 'Airtime\GenerateController@create')->name('airtime.create');
    Route::post('/airtime/create', 'Airtime\GenerateController@store')->name('airtime.create');

    Route::get('/api/promocode/reward', 'Airtime\PromocodeController@getReward');
});

Auth::routes();

