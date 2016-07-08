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
}
