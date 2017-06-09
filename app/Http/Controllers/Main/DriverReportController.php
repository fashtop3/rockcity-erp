<?php

namespace App\Http\Controllers\Main;

use App\Http\Requests\DriverReportStoreRequest;
use App\Models\Report\DriverReport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
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

    public function admin_index()
    {
        $reports = DriverReport::latest()->paginate(100);

        return view('main.report.driver.admin-index', compact('reports'));
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
     * @param DriverReportStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
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
            $disabled = "disabled=''";
        } catch(\Exception $e) {
            Session::flash('error', 'Report not found');
            return redirect()->route('report.driver');
        }
        return view('main.report.driver.show', compact('report', 'disabled'));
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
            $report = DriverReport::findOrFail($id);
        } catch(\Exception $e) {
            Session::flash('error', 'Report not found');
            return redirect()->route('report.driver');
        }
        return view('main.report.driver.edit', compact('report'));
    }


    /**
     * @param DriverReportStoreRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(DriverReportStoreRequest $request, $id)
    {
//        dd($request->all());
        try {
            $report = DriverReport::findOrFail($id);
            $report->update($request->all());
            Session::flash('success', 'Report updated.');
        }
        catch(\Exception $e)
        {
//            dd($e->getMessage());
            Session::flash('error', "Report not found");
            return redirect()-route('report.driver');
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
//        DB::beginTransaction();
        try{
            $report = DriverReport::findOrFail($id);

            $report->delete();
            Session::flash('success', 'Report has been deleted');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Report not found');
            if($e->getCode() == 403) {
                Session::flash('error', $e->getMessage());
            }
        }

        return redirect()->back();
    }
}
