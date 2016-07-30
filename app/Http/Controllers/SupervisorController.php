<?php

namespace App\Http\Controllers;

use App\AssessmentSupervisor;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SupervisorController extends Controller
{
    public function index()
    {
        $this->middleware('auth.basic');
        $this->middleware('role:admin|executive.director|administration.dept', ['only' => ['store']]);
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
            'preview' => 'required|boolean',
            'attributes' => 'required|array',
            'habit' => 'required|array',
            'leadership' => 'required|array'
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

        DB::beginTransaction();

        $supervise = AssessmentSupervisor::updateOrCreate(
            ['assessment_id' => $request->get('assessment_id'), 'user_id'=>$user->id],
            ['user_id'=>$user->id, 'preview'=> $request->get('preview'),
                'assessment_id' => $request->get('assessment_id'),
                'attributes' => $request->get('attributes'), 'habit' => $request->get('habit'),
                'leadership' => $request->get('leadership')
            ]
        );

        if($supervise) {

            DB::commit();

            return response($supervise);
        }

        return response('Data update failed!', 403);
    }
}
