<?php

namespace App\Http\Controllers\Main;

use App\Events\UserChangedPassword;
use App\Events\UserRequestReset;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\PasswordResets;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Mockery\CountValidator\Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('main.profile.edit');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProfileUpdateRequest $request, $id)
    {
        try{
            $input = $request->all();
            unset($input['email']); // remove email from request
            auth()->user()->update($input);
            if(Hash::check($request->get('old_password'), auth()->user()->password)) {
                auth()->user()->update(['password'=> Hash::make($request->get('new_password'))]);
                auth()->logout();
            }

            Session::flash('success', "Profile updated");
        }
        catch(\Exception $e) {
            Session::flash('error', "Profile updated failed contact site administrator!");
        }

        return redirect()->back()->withInput();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory
     * |\Symfony\Component\HttpFoundation\Response
     */
    public function recover(Request $request)
    {
//        $this->validate($request, [
//            'email' =>  'required|email',
//        ]);

        $validator = Validator::make($request->all(), [
            'email' =>  'required|email',
        ]);

        if($validator->fails()) {
            return response($validator->errors(), 403);
        }

        $user = User::where('email', '=', $request->get('email'))->get()->first();

        if(!$user) {
            return response('Email not found!.', 403);
        }

        return $this->sendResetLink($user);

    }

    public function changePassword(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');
        $token = $request->get('token');

        $reset = PasswordResets::email($email)->token($token)->get()->first();

        if(!$reset) {

            return response('Reset link has expired!.', 403);
        }

        if($reset->created_at->addHours(3) < Carbon::now()) {
            $reset->delete();

            return response('Reset link has expired!.', 403);
        }

        //do change password here

        $user = User::where('email', $email)->get()->first();

        $user->forceFill(['password' => bcrypt($password)])->save();
        $reset->delete();

        //send a success mail to
        //Todo: design a success template
        event(new UserChangedPassword($user));

        return response('Password successfully changed!.');

    }

    /**
     * @param Request $request
     * @param $user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    protected function sendResetLink($user)
    {
        $recover = PasswordResets::updateOrCreate(['email' => $user->email],
            ['token' => Str::random(60)]);

        //send email notification
        event(new UserRequestReset($user, $recover));

        return response($recover);
    }

}
