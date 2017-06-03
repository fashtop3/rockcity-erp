<?php

namespace App\Http\Controllers\Main;

use App\Http\Requests\DriverReportStoreRequest;
use App\Models\Report\DriverReport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class DriverReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports = auth()->user()->driver_reports()->paginate(100);

        return view('main.report.driver.index', compact('reports'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.report.driver.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DriverReportStoreRequest $request)
    {
        try{

            auth()->user()->driver_reports()->create($request->all());

            Session::flash('success', 'Report saved');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Error saving report');
        }

        return redirect()->route('report.driver');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $report = DriverReport::findOrFail($id);
        } catch(\Exception $e) {
            Session::flash('error', 'Report not found');
            return redirect()->route('report.driver');
        }
        return view('main.report.driver.edit', compact('report'));
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
        //
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
}
