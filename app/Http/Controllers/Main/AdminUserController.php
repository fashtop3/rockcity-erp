<?php

namespace App\Http\Controllers\Main;

use App\Http\Requests\AdminUserUpdate;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Mockery\CountValidator\Exception;

class AdminUserController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:' . User::RegisterStaffRoles/*,
            ['only' => ['create','store','destroy']]*/);
        $this->middleware('permission:register.staff', ['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(100);

        return view('main.people.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.people.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $input = $request->all();
            $input['status'] = $request->get('status') ? 1 : 0;

            if(!empty($request->get('new_password'))) {
                $input['password'] = Hash::make($request->get('new_password'));
            } else {
                $input['password'] = Hash::make(strtolower($request->get('lastname')));
            }

            $user = User::create($input);
            if(is_array($request->get('roles'))) {
                //get the id's of roles from the array
                $user->roles()->sync(array_values($request->get('roles')));
            }
            if(is_array($request->get('permissions'))) {
                //get id's of permissions from the array
                $user->permissions()->sync(array_values($request->get('permissions')));
            }

            Session::flash('success', "Account created updated");
        }
        catch(\Exception $e) {
            Session::flash('error', "Account creation failed!");
        }

        return redirect()->back()->withInput();
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
        try{
            $person = User::findOrFail($id);
        }
        catch(\Exception $e){
            Session::flash('error', 'User\'s account not found');
            return redirect()->back();
        }

        return view('main.people.edit', compact('person'));
    }


    /**
     * @param AdminUserUpdate $request
     * @param $id
     * @return $this
     */
    public function update(AdminUserUpdate $request, $id)
    {
        try{
            $user = User::findOrFail($id);

            $input = $request->all();
            $input['status'] = $request->get('status') ? 1 : 0;

            if(!empty($request->get('new_password'))) {
                $input['password'] = Hash::make($request->get('new_password'));
            }

            $user->update($input);
            if(is_array($request->get('roles'))) {
                //get the id's of roles from the array
                $user->roles()->sync(array_values($request->get('roles')));
            }
            if(is_array($request->get('permissions'))) {
                //get id's of permissions from the array
                $user->permissions()->sync(array_values($request->get('permissions')));
            }

            Session::flash('success', "Account successfully updated");
        }
        catch(\Exception $e) {
//            dd($e->getMessage());
            Session::flash('error', "Account update failed!");
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
        try{
            $user = User::findOrFail($id);

            if(auth()->user()->id == $id) {
                throw new Exception('Unauthorized operation', 403);
            }

            $user->delete();
            Session::flash('success', 'User has been moved to trash');
        }
        catch(\Exception $e) {
            Session::flash('error', 'User not found');
            if($e->getCode() == 403) {
                Session::flash('error', $e->getMessage());
            }
        }

        return redirect()->back();
    }
}
