<?php

namespace App\Http\Controllers\Assessment;

use App\Models\Assessment\Assessment;
use App\Models\Assessment\AssessmentConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Mockery\CountValidator\Exception;

class AssessmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:staff');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assessments = auth()->user()->assessments()->with('supervisor')->paginate(100);
        return view('main.assessment.index', compact('assessments'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.assessment.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        dd($request->all());

        DB::beginTransaction();

        try{
            $config =  AssessmentConfig::where('enable', 1)->first();
            if(!$config) {
                throw new Exception('No available assessment log', 403);
            }

            $assessment = $config->assessments()->create([
                'user_id' => auth()->user()->id,
                'preview' => 1
            ]);

            $assessment->partOne()->create($request->get('part_one'));
            $assessment->partTwo()->create($request->get('part_two'));
            $assessment->partThree()->create($request->get('part_three'));

//            dd($assessment);

            DB::commit();
            Session::flash('success', 'Assessment record saved');
        }
        catch (\Exception $e) {
            dd($e->getMessage());

            if($e->getCode() == 23000) {
                Session::flash('error', 'Integrity constraint violation: 1062 Duplicate entry');
            }
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
            $assessment = Assessment::findOrFail($id);
        }
        catch(\Exception $e) {
            Session::flash('error', 'error: no record found');
            return redirect()->back();
        }
        return view('main.assessment.edit', compact('assessment'));
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
        try{
            $assessment = Assessment::findOrFail($id);
            $assessment->partOne()->create($request->get('part_one'));
            $assessment->partTwo()->create($request->get('part_two'));
            $assessment->partThree()->create($request->get('part_three'));

            Session::flash('success', 'Assessment record saved');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Update failed: contact administrator');
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
//        DB::beginTransaction();
        try{
            $assessment = Assessment::find($id);

            if(!$assessment) {
                Session::flash('error', 'Record doesn\'t exists');
                throw  new Exception;
            }

            if($assessment->preview) {
                Session::flash('error', 'Record can no longer be removed');
                throw  new Exception;
            }

            if($assessment->delete()) {
                Session::flash('success', 'Record deleted successfully');
            } else {
                Session::flash('error', 'Failed to delete record!. contact the administrator');
                throw  new Exception;
            }
        }
        catch(\Exception $e) {
        }
        return redirect()->back();
    }
}
