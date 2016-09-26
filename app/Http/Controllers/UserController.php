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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use UploadefdFile;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['checkAuth', 'isAuth', 'store', 'contacts', 'recover', 'changePassword'] ]);

        $this->middleware('role:admin|executive.director|administration.dept', ['only' => ['destroy']]);

//        Auth::guard($this->getGuard())->login($user);
//        $user->forceFill([
//        'password' => bcrypt($password),
//            'remember_token' => Str::random(60),
//        ])->save();
    }

    public function index()
    {
        $people = User::orderBy('id', 'desc')->get();
        if($people) {
            foreach($people as &$user) {
                $user->roles->toArray();
                $user->permissions->toArray();
            }
            return response($people);
        }
        return response('No user found!', 403);
    }

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


    public function isAuth()
    {
        if(Auth::check()){
            return response(Auth::user());
        }

        return response('Unauthorized', 403);
    }


    public function logoutUser()
    {
        Auth::logout();
    }

    public function getMarketers()
    {
        $role = Role::where('name', 'marketing')->get()->first();

        if(empty($role->users->toArray()))
        {
            return response('No user found in marketing', 403);
        }

        return response($role->users);
    }

    public function userPermissions()
    {
        $permissions = Auth::user()->permissions()->get();
        $roles = Auth::user()->roles()->get();
        $roleArr = [];
        $permissionArr = [];

        if(!empty($permissions)) {
            foreach($permissions as $permission) {
                $permissionArr[] = $permission->slug;
            }
        }
        if(!empty($roles)) {
            foreach($roles as $role) {
                $roleArr[] = $role->slug;
            }
        }
        return response(['permissions'=>$permissionArr, 'roles'=>$roleArr]);
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'email' =>  'required|email',
            'password'  =>  'required|between:6,16',
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
        $user = User::findOrFail($id);
        //get user roles and permissions
        $user->roles->toArray();
        $user->permissions->toArray();
        return response($user);
    }


    public function update($id, Request $request)
    {
        //Todo: validate
        try{
            $user = User::findOrFail($id);
        }
        catch(\Exception $e) {
            return response('User not found', 403);
        }

        //changing user's password
        if($request->get('action') && $request->get('action') == 'password') {
            //validate request for password reset
            $validator = Validator::make($request->all(), [
               'new_password' => 'required|between:6,16',
                'password_confirm' => 'required|same:new_password',
                'password' => 'required|between:6,16',
            ]);
            if($validator->fails()) {
                return response($validator->errors(), 403);
            }
            $current = $request->get('password');
            $new = $request->get('new_password');
            if(Hash::check($current, $user->password)) {
                $user->password = Hash::make($new);
                $user->save();
               return response(['data'=>'Password changed. will be effective next login.'])
                   ->header('Content-Type', 'text/plain');
            }
            return response('Authentication Failed', 403 );
        }


        $input['firstname'] = $request->get('firstname');
        $input['lastname'] = $request->get('lastname');
        $user->update($input);

        return response(['data'=>'Account successfully updated.']);
    }

    public function profileUpdateByAdmin($id, Request $request)
    {
        //Todo: validate please
        $validator = Validator::make($request->all(), [
            'password' => 'sometimes|required|between:6,16',
            'password_confirm' => 'sometimes|required|same:password',
        ]);
        if($validator->fails()) {
            return response('Invalid credentials', 403);
        }

        try {
            if( !Auth::user()->canRegisterStaff() )
                return response('You are not authorized to update this account', 403);

            $user = User::findOrFail($id);
        }
        catch(\Exception $e)  {
            return response('User not found', 403);
        }

        $input = [];

        if(!empty($request->get('password'))) {
            $input['password'] = Hash::make($request->get('password'));
        }

        $input['firstname'] = $request->get('firstname');
        $input['lastname'] = $request->get('lastname');
        $input['status'] = $request->get('status') ? 1 : 0;
        $user->update($input);
        $this->setRolePermission($request, $user);
        return response(['data'=>'Account successfully updated.']);
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
        $contacts = [
            ['name'=>'Admin', 'email'=> User::Contact_Admin ],
            ['name'=>'Executive Director', 'email'=> User::Contact_ED ],
            ['name'=>'Account', 'email'=> User::Contact_Account ],
            ['name'=>'Support', 'email'=> User::Contact_Support ],
            ['name'=>'Traffic', 'email'=> User::Contact_Traffic ],
            ['name'=>'Marketing', 'email'=> User::Contact_Marketing ],
        ];

        return response($contacts);
    }

    protected function setRolePermission(Request $request, $newUser)
    {
        //if is submitted
        if(is_array($request->get('roles'))) {

            //get the id's of roles from the array
            $newUser->roles()->sync(array_keys($request->get('roles')));
        }

        if(is_array($request->get('permissions'))) {

            //get id's of permissions from the array
            $newUser->permissions()->sync(array_keys($request->get('permissions')));
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

    /**
     * @param Request $request
     * @param $user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    protected function sendResetLink($user)
    {
        $recover = PasswordResets::updateOrCreate(['email' => $user->email], ['token' => Str::random(60)]);

        //send email notification
        Event::fire(new UserRequestReset($user, $recover));

        return response($recover);
    }
}
