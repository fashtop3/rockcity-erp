<?php

namespace App\Http\Controllers;

use App\DriverReport;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DriverController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports = DriverReport::where('user_id', Auth::user()->id)->get();
        foreach($reports as $report) {
            $report->vehicle->toArray();
            $report->user->toArray();
        }

        return response($reports);
    }

    public function getReports()
    {
        $reports = DriverReport::latest()->get();
        foreach($reports as $report) {
            $report->vehicle->toArray();
            $report->user->toArray();
        }

        return response($reports);
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
            'vehicle_id' => 'required|int',
            'info' => 'required|array',
            'html_text' => 'string'
        ]);

        if($validator->fails()) {
            return response('Form submission error!. contact the administrator', 403);
        }

        $input = $request->all();
        $input['user_id'] = Auth::user()->id;

        $report = DriverReport::create($input);

        if($report) {
            return response($report);
        }

        return response('Error creating report', 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $report = DriverReport::findOrFail($id);

        if($report) {
            $report->vehicle->toArray();
            return response($report);
        }

        return response('Error report doesn\'t exists' , 403);
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
        $validator = Validator::make($request->all(), [
            'vehicle_id' => 'required|int',
            'info' => 'required|array',
            'html_text' => 'string'
        ]);

        if($validator->fails()) {
            return response('Form submission error!. contact the administrator', 403);
        }

        $report = DriverReport::find($id);

        if(!$report) {
            return response('Report doesn\'t exists', 403);
        }

        $input = $request->all();
        $input['user_id'] = Auth::user()->id;

        $report->update($input);
        $report->vehicle->toArray();

        return response($report);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $report = DriverReport::find($id);


        if(!$report) {
            return response('Report doesn\'t exists', 403);
        }

        //if account is not created by the current user
        if($report->user_id != Auth::user()->id) {

            //if the current user is not an admin or ....
            if(!$this->user->is('admin|executive.director|head.marketing')) {
                return response('You are not authorized to delete client', 403);
            }
        }


        if($report->delete()) {
            return response('Report deleted successfully');
        }

        return response('Failed to delete report!. contact the administrator', 403);
    }
}
