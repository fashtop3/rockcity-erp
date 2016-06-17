<?php

namespace App\Http\Controllers;

use App\Events\UserChangedPassword;
use App\Events\UserRequestReset;
use App\Http\Requests\AuthRequest;
use App\PasswordResets;
use App\Permission;
use Carbon\Carbon;
use Event;
use App\Events\UserHasRegistered;
use App\Role;
use App\Upload;
use App\User;
use Illuminate\Database\Console\Migrations\ResetCommand;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use UploadefdFile;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.basic', ['except' => ['checkAuth', 'isAuth', 'store', 'contacts', 'recover', 'changePassword'] ]);
//        $this->middleware('auth', ['except' => ['checkAuth', 'isAuth', 'store', 'contacts'] ]);

//        Auth::guard($this->getGuard())->login($user);
//        $user->forceFill([
//        'password' => bcrypt($password),
//            'remember_token' => Str::random(60),
//        ])->save();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function checkAuth(AuthRequest $request)
    {
        $credentials = [
            'email' => $request->get('email'),
            'password' => $request->get('password'),
        ];

        //if the credentials are wrong
        if(!Auth::attempt($credentials)) {
            return response('Username or password do not match', 403);
        }

        if(Auth::user()->status == 1) {
            Auth::logout();
            return response('Access denied contact Administrator!.', 403);
        }

        //Todo: correct this from registration controller
        //Auth::user()->upload->toArray();
        return response(Auth::user());
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function isAuth()
    {
        if(Auth::check()){
            return response('Authorized');
        }

        return response('Unauthorized', 403);
    }

    /**
     *
     */
    public function logoutUser()
    {
        Auth::logout();
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {

        $people = User::all();

        if($people) {
            foreach($people as &$user) {

                $user->roles->toArray();
                $user->permissions->toArray();
            }

            return response($people);
        }

        return response('No user found!', 403);
    }

    public function getMarketers()
    {
        //TODO: check user role and permissions here

        $role = Role::where('name', 'marketing')->get()->first();

        if(empty($role->users->toArray()))
        {
            return response('No user found in marketing', 403);
        }

        return response($role->users);
    }

    /**
     * @param $perm
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function userCan($slug)
    {
        $permission = Permission::where('slug', $slug)->get()->first();

        if(!$permission) {
            return response('not found', 403);
        }

        if(Auth::user()->can($permission->slug)) {
            return response('Authorized');
        }

        return response('Unauthorized', 403);
    }

    public function userIs($slug)
    {
        $role = Role::where('slug', $slug)->get()->first();

        if(!$role) {
            return response('not found', 403);
        }

        if(Auth::user()->is($role->slug)) {
            return response('Authorized');
        }

        return response('Unauthorized', 403);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'email' =>  'required|email',
            'password'  =>  'required|between:6,8',
            'status'    =>  'integer'
        ]);

        if($validator->fails()) {
            return response($validator->errors(), 403);
        }

        $input = [
            'firstname' =>  trim($request->get('firstname')),
            'lastname'  =>  trim($request->get('lastname')),
            'email'     =>  trim(strtolower($request->get('email'))),
            'password'  =>  bcrypt(strtolower(trim($request->get('password')))),
            'status'    => $request->get('status', 0),
        ];


        //validate email
        if(User::where('email', $input['email'])->get()->first()) {
            return response('Email exists', 403);
        }

        DB::beginTransaction();

        if($user = User::create($input))
        {
            // can only be done by admin and must be loggedIn
            $this->setRolePermission($request, $user);

            //Todo: design a mail for registration
            //send a notification mail
            Event::fire(new UserHasRegistered($user));

            DB::commit();
            return response('Account created successfully');
        }

        return response('Registration Failed', 403);
    }


    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public  function show($id)
    {

        if(Auth::user()->id != $id) {
            if(!Auth::user()->canRegisterStaff()) {
                return response('You are not authorized to edit this account', 403);
            }
        }

        //TOdo: or if user is admin to validate using roles and perimissions

        $user = User::find($id);

        if(!$user) {
            return response('User not found', 403);
        }

        //get user roles and permissions
        $user->roles->toArray();
        $user->permissions->toArray();

        return response($user);
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function update($id, Request $request)
    {
        //Todo: admin check first using else if

        if($id != Auth::user()->id) {
            if( !Auth::user()->canRegisterStaff() ) {
                return response('You are not authorized to update this account', 403);
            }
        }

        $user = User::find($id);

        if($user) {
            $user->update($request->all());

            $this->setRolePermission($request, $user);

            return response('Account successfully updated.');
        }

        return response('User not found', 403);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function upload($id, Request $request)
    {
        if(!User::find($id))
            return response('User not found', 403);

        $file = $request->all()['file'];

        $filename = 'user_'.$id.'.'.$file->getClientOriginalExtension();
        $file->move(public_path() .'/app/img/user/', $filename);

        Upload::Create(['user_id' => $id, 'filename' => $filename, 'thumbnail' => $file->getRealPath()]);

        return response('File uploaded successfully');

    }

    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response('User not found', 403);
        }

        if(Auth::user()->id == $id) {
            return response('Unauthorized operation', 403);
        }

        if(Auth::user()->canRegisterStaff()) {

            if($user->delete()) {
                return response('User deleted successfully');
            }
        }
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function contacts()
    {
//        dd(Auth::user());
        $contacts = [
            ['name'=>'Admin', 'email'=>'niran.malaolu@rockcityfmradio.com'],
            ['name'=>'Technical', 'email'=>'fashtop3@gmail.com'],
            ['name'=>'Support', 'email'=>'fashtop3@gmail.com'],
            ['name'=>'Marketing', 'email'=>'olufunso.adeniran@rockcityfmradio.com'],
        ];

        return response($contacts);
    }

    /**
     * @param Request $request
     * @param $user
     */
    protected function setRolePermission(Request $request, $user)
    {
        $user = Auth::user();
        //check if user is logged in and has permission to register user
        if($user && $user->can('register.staff')) {

            //if is submitted
            if(is_array($request->get('roles'))) {

                //get the id's of roles from the array
                $user->roles()->sync(array_keys($request->get('roles')));
            }

            if(is_array($request->get('permissions'))) {

                //get id's of permissions from the array
                $user->permissions()->sync(array_keys($request->get('permissions')));
            }
        }
    }


    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
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

        $recover = PasswordResets::updateOrCreate(['email' => $request->get('email')] , ['token' => Str::random(60)]);

        //send email notification
        Event::fire(new UserRequestReset($user, $recover));

        return response($recover);

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
        Event::fire(new UserChangedPassword($user));

        return response('Password successfully changed!.');

    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function permissions()
    {
        //return all permissions given to current user
         return response(Auth::user()->permissions->toArray());
    }
}
