<?php

namespace App\Http\Controllers;

use App\Target;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class TargetController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.basic');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $targets = Target::all();

        if($targets){
            return response($targets);
        }

        return response('Not target found', 403);
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
        //TODO:validate here

        $input = $request->all();

        if(!Target::create($input)) {
            return response('Failed to create target', 403);
        }

        return response('Target created successfully');
    }

    public function getMyTargets()
    {
        if(!empty($targets = Auth::user()->targets->toArray())) {

            return response($targets, 201);
        }

        return response('No targets set for you', 403);
    }

    public function getUserTargets($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response('User doesn\'t exists' , 403);
        }

        if(!empty($targets = $user->targets->toArray())) {

            return response($targets);
        }

        return response('No targets set for you', 403);
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       $target = Target::find($id);

        if($target) {
            $target->update($request->all());

            return response('Target updated successfully');
        }

        return response('Failed update target', 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $target = Target::find($id);

        if($target) {
            $target->delete();

            return response('Target deleted');
        }

        return response('Target not found', 403);

    }
}
