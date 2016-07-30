<?php

namespace App\Http\Controllers;

use App\Vehicle;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{

    public function __construct()
    {

        $this->middleware('auth.basic');
        $this->middleware('role:admin|executive.director|administration.dept',
            ['only' => ['store', 'update', 'destroy']]);
//        $this->middleware('permission:edit.articles', ['only' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicle = Vehicle::all();

        if(empty($vehicle)) {
            return response('No registered vehicle', 403);
        }

        return response($vehicle);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|alpha_num',
            'reg'   => 'required|alpha_num',
            'eng'   => 'required|alpha_num',
            'colour'    => 'required|alpha'
        ]);

        $input = $request->all();
        $input['user_id'] = Auth::user()->id;

        if(Vehicle::reg($request->get('reg'))->toArray())
        {
            return response('Vehicle registration number exists!', 403);
        }


        if(Vehicle::eng($request->get('eng'))->toArray())
        {
            return response('Vehicle engine number exists!', 403);
        }

//        if(!empty(DB::select("SELECT * from vehicles WHERE reg = '".$request->get('reg') ."' AND eng = '".$request->get('eng')."'")))
//        {
//
//        }


        if($validator->fails()) {
            return response($validator->errors()->all(), 403);
        }


        if(Vehicle::create($input))
        {
            return response('Vehicle added successfully');
        }
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
        $vehicle = Vehicle::find($id);

        if($vehicle) {
            $vehicle->update($request->all());

            return response('Vehicle updated successfully');
        }

        return response('Vehicle not found', 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);

        if($vehicle) {
            $vehicle->delete();

            return response('Vehicle deleted');
        }

        return response('Vehicle not found', 403);
    }
}
