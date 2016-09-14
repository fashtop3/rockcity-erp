<?php

namespace App\Http\Controllers;

use App\Assessment;
use App\AssessmentConfig;
use App\AssessmentPartOne;
use App\AssessmentPartThree;
use App\AssessmentPartTwo;
use App\AssessmentSupervisor;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
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
        $user = Auth::user();

        $user->assessments()->get();

        foreach($user->assessments as $assessment) {
            $assessment->supervisor()->get();
        }

        return response($user->assessments);
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

        $validator = Validator::make($request->all(), [
            'assessment_config_id' => 'required|integer',
            'preview' => 'required|boolean',
            'part_one' => 'required|array',
            'part_two' => 'required|array',
            'part_three' => 'required|array'
        ]);

//        $validator->after(function($validator) {
//            if ($this->somethingElseIsInvalid()) {
//                $validator->errors()->add('field', 'Something is wrong with this field!');
//            }
//        });

        if($validator->fails()) {
            return response('Something is wrong with the form!', 403);
        }

        //Todo: move this update
//        if($request->get('preview') == '1')
//            return response('Form has been submitted for review', 403);

        $config = AssessmentConfig::find($request->get('assessment_config_id'));
        if(!$config->enable) {
           return response('Submission closed', 403);
        }

        DB::beginTransaction();

        $assessment = Assessment::updateOrCreate(
            ['assessment_config_id'=> $request->get('assessment_config_id'), 'user_id'=>$user->id],
            ['assessment_config_id'=> $request->get('assessment_config_id'), 'user_id'=>$user->id, 'preview'=> $request->get('preview')]
        );

        if($assessment) {
            $partOne = $request->get('part_one');
            $partTwo = $request->get('part_two');
            $partThree = $request->get('part_three');

            if ($this->partOneForm($partOne, $assessment) &&
                $this->partTwoForm($partTwo, $assessment) &&
                $this->partThreeForm($partThree, $assessment)) {

                DB::commit();

                $assessment->partOne->toArray();
                $assessment->partTwo->toArray();
                $assessment->partThree->toArray();

                return response($assessment);
            }
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

        $assessment = Assessment::find($id);

        if($assessment) {
            $assessment->partOne->toArray();
            $assessment->partTwo->toArray();
            $assessment->partThree->toArray();
            $assessment->supervisor()->get();

            if($assessment->supervisor)
                $assessment->supervisor->toArray();

            return response($assessment);
        }

        return response('Assessment data not found!', 403);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function records($id)
    {
        $assessments = Assessment::where('assessment_config_id', $id)->get();

        if($assessments) {
            foreach($assessments as $assessment) {
                $assessment->user->toArray();
                $assessment->partOne->toArray();
                $assessment->partTwo->toArray();
                $assessment->partThree->toArray();
                $assessment->supervisor()->get();

                if($assessment->supervisor)
                    $assessment->supervisor->toArray();
            }

            return response($assessments);
        }

        return response('Assessment data not found!', 403);
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
        $assessment = Assessment::find($id);

        if($assessment->preview) {
            return response('Record can no longer be removed', 403);
        }

        if(!$assessment) {
            return response('Record doesn\'t exists', 403);
        }

        if($assessment->delete()) {
            return response(['data'=>'Record deleted successfully']);
        }

        return response('Failed to delete record!. contact the administrator', 403);
    }

    /**
     * @param $partOne
     * @param $assessment
     * @return
     * @internal param Request $request
     */
    protected function partOneForm($partOne, $assessment)
    {

        return AssessmentPartOne::updateOrCreate(
            ['assessment_id' => $assessment->id,],
            ['assessment_id' => $assessment->id, 'personal' => $partOne['personal'], 'qualifications' => $partOne['qualifications']
        ]);
    }

    /**
     * @param $partTwo
     * @param $assessment
     * @return
     * @internal param Request $request
     */
    protected function partTwoForm($partTwo, $assessment)
    {

        return AssessmentPartTwo::updateOrCreate(
            ['assessment_id' => $assessment->id,],
            ['assessment_id' => $assessment->id, 'review' => $partTwo['review'], 'performance' => $partTwo['performance']
        ]);
    }

    /**
     * @param $partThree
     * @param $assessment
     * @return
     * @internal param Request $request
     */
    protected function partThreeForm($partThree, $assessment)
    {
        return AssessmentPartThree::updateOrCreate(
            ['assessment_id' => $assessment->id,],
            ['assessment_id' => $assessment->id, 'competencies' => $partThree['competencies']
        ]);
    }
}
