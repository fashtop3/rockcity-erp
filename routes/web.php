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
Route::group(['prefix' => 'app', 'middleware' => ['auth']], function() {
    Route::get('/dashboard', 'Main\DashboardController@index')->name('dashboard');
});

Auth::routes();

