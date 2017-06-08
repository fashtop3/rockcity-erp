<?php

namespace App\Http\Controllers\Assessment;

use App\Models\Assessment\Assessment;
use App\Models\Assessment\AssessmentSupervisor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class SupervisorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id)
    {
        $supervisor = null;
        try{
            $assessment = Assessment::findOrFail($id);
            $supervisor = $assessment->supervisor()->where('user_id', auth()->user()->id)->first();
        }
        catch(\Exception $e) {
            Session::flash('error', 'error: no record found');
            return redirect()->back();
        }
        return view('main.assessment.supervise', compact('assessment', 'supervisor'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
//        DB::beginTransaction();
        try{

            $assessment = Assessment::findOrFail($id);
            $input = $request->all();
//            $input['assessment_id'] = $id;
            $input['user_id'] = auth()->user()->id;
            //Todo: update migration file for AssessmentSupervisor changed table preview col to default 1
            $assessment->supervisor()->updateOrCreate(['assessment_id' => $id, 'user_id'=>auth()->user()->id], $input);

            Session::flash('success', 'Comments saved');
//            DB::commit();

        }
        catch(\Exception $e) {
//            dd($e->getMessage());
            Session::flash('error', 'Error saving Comment. contact administrator');
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
        try{
            $assessment = Assessment::findOrFail($id);
            $isSupervisor = true;
            $disable = 'disabled=""';
        }
        catch(\Exception $e) {
            Session::flash('error', 'error: no record found');
            return redirect()->back();
        }
        return view('main.assessment.edit', compact('assessment', 'disable', 'isSupervisor'));
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
            $assessment = Assessment::findOrFail($id);
        }
        catch(\Exception $e) {
            Session::flash('error', 'error: no record found');
            return redirect()->back();
        }
        return view('main.assessment.supervise', compact('assessment'));
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
