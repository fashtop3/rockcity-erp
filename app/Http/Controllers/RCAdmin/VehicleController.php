<?php

namespace App\Http\Controllers\RCAdmin;

use App\Http\Requests\VehicleStoreRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Admin\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class VehicleController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:admin|executive.director|administration.dept',
            ['only' => ['store', 'update', 'destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::orderBy('id', 'desc')->paginate(100);

        return view('main.vehicle.index', compact('vehicles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.vehicle.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VehicleStoreRequest $request)
    {
        try{
            auth()->user()->vehicles()->create($request->all());
            Session::flash('success', 'Vehicle added successfully');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Failed to add new vehicle');
            return redirect()->back()->withInput();
        }

        return redirect()->back();
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
            $vehicle = Vehicle::findOrFail($id);
        }
        catch(\Exception $e){
            Session::flash('error', 'Vehicle not found');
            return redirect()->back();
        }

        return view('main.vehicle.edit', compact('vehicle'));
    }


    /**
     * @param VehicleUpdateRequest $request
     * @param $id
     * @return $this
     */
    public function update(VehicleUpdateRequest $request, $id)
    {
        try{
            $vehicle = Vehicle::findOrFail($id);

            $vehicle->update($request->all());

            Session::flash('success', "Vehicle <strong>{$vehicle->name}->{$vehicle->reg}</strong> updated");
        }
        catch(\Exception $e) {
//            dd($e->getMessage());
            Session::flash('error', "Vehicle update failed!");
        }

        return redirect()->back()->withInput();
    }


    public function destroy($id)
    {
//        DB::beginTransaction();
        try{
            $vehicle = Vehicle::findOrFail($id);

            $vehicle->delete();
            Session::flash('success', 'Vehicle deleted');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Vehicle not found');
        }

        return redirect()->back();
    }
}
