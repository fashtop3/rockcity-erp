<?php

namespace App\Http\Controllers;

use App\Assessment;
use App\AssessmentPartOne;
use App\AssessmentPartThree;
use App\AssessmentPartTwo;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
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
        $user = Auth::user();

        dd($request->all());

        $validator = Validator::make($request->all(), [
            'partOne' => 'required|array',
            'partTwo' => 'required|array',
            'partThree' => 'required|array'
        ]);

//        $validator->after(function($validator) {
//            if ($this->somethingElseIsInvalid()) {
//                $validator->errors()->add('field', 'Something is wrong with this field!');
//            }
//        });

        if($validator->fails()) {
            return response('Something is wrong with the form!', 403);
        }

        DB::beginTransaction();

        $assessment = Assessment::create(['user_id'=>$user->id]);

        $partOne = $request->get('partOne');
        $partTwo = $request->get('partTwo');
        $partThree = $request->get('partThree');

        if ($this->partOneForm($partOne, $assessment) &&
            $this->partTwoForm($partTwo, $assessment) &&
            $this->partThreeForm($partThree, $assessment)) {

            DB::commit();

            return response('Data saved');
        }

        return response('Something is wrong with the form!', 403);
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

    /**
     * @param Request $request
     * @param $assessment
     */
    protected function partOneForm($partOne, $assessment)
    {

        return AssessmentPartOne::create([
            'assessment_id' => $assessment->id,
            'personal' => serialize($partOne['personal']),
            'qualifications' => serialize($partOne['qualifications'])
        ]);
    }

    /**
     * @param Request $request
     * @param $assessment
     */
    protected function partTwoForm($partTwo, $assessment)
    {

        return AssessmentPartTwo::create([
            'assessment_id' => $assessment->id,
            'review' => serialize($partTwo['performance']),
            'performance' => serialize($partTwo['performance'])
        ]);
    }

    /**
     * @param Request $request
     * @param $assessment
     */
    protected function partThreeForm($partThree, $assessment)
    {

        return AssessmentPartThree::create([
            'assessment_id' => $assessment->id,
            'competencies' => serialize($partThree['competencies'])
        ]);
    }
}
