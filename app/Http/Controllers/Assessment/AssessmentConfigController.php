<?php

namespace App\Http\Controllers\Assessment;

use App\Models\Assessment\AssessmentConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class AssessmentConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Todo: restrict to admin
        $configs = AssessmentConfig::paginate(100);
        return view('main.assessment.log', compact('configs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.assessment.settings');
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
        try{
            $config = AssessmentConfig::findOrFail($id);
        }
        catch(\Exception $e) {
            Session::flash('error', 'error: no record found');
            return redirect()->back();
        }
        return view('main.assessment.settings-edit', compact('config'));
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
//        dd(1);
        try{
            $config = AssessmentConfig::find($id);

            $input =  $request->all();
            $input['enable'] = $request->get('enable', 0);

            AssessmentConfig::checkResetAll($input['enable']);

            $config->update($input);
            $config->assessments()->update(['preview' => !$input['enable']]);

            Session::flash('success', 'Settings updated');
        }
        catch(\Exception $e) {
            dd($e->getMessage());
            Session::flash('error', 'Settings update failed');
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
        //
    }

    public function data($id)
    {
        try{
            $config = AssessmentConfig::findOrFail($id);
            $assessments = $config->assessments()->paginate(100);
        }
        catch(\Exception $e) {

            return redirect()->back();
        }

        return view('main.assessment.log-data', compact('assessments'));
    }
}
