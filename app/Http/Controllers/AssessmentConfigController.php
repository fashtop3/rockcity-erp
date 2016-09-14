<?php

namespace App\Http\Controllers;

use App\Assessment;
use App\AssessmentConfig;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AssessmentConfigController extends Controller
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
        //Todo: restrict to admin
        $configs = AssessmentConfig::all();

        return response($configs);
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
            'enable' => 'required|boolean',
            'starts' => 'required|date',
            'ends' =>  'required|date'
        ]);

        if($validator->fails()) {
            return response('Settings not valid', 403);
        }

        $input =  $request->all();
        $input['user_id'] = Auth::user()->id;

        AssessmentConfig::checkResetAll($input['enable']);

        $config = AssessmentConfig::create($input);

        return response($config);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $config = AssessmentConfig::find($id);

        if(!$config) {
            return response('Schedule not found', 403);
        }

        return response($config);
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
        $config = AssessmentConfig::find($id);

        if(!$config) {
            return response('Schedule not found', 403);
        }

        $input =  $request->all();

        AssessmentConfig::checkResetAll($input['enable']);

        $config->update($input);
        $config->assessments()->update(['preview' => !$input['enable']]);

        return response($config);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $config = AssessmentConfig::find($id);

        if(!$config) {
            return response('Schedule not found', 403);
        }

        if(empty($config->assessments->toArray())) {
            $config->forceDelete();
        }
        else {
            $config->delete(); //soft deletes
        }

        return response('Schedule deleted successfully');
    }

    public function getActive() {

        $config = AssessmentConfig::getActive()->get()->first();

        if(!$config) {
            return response('no active schedule', 403);
        }

        $ass = Assessment::where('assessment_config_id', $config->id)->where('user_id', Auth::user()->id)->get()->first();
        if($ass)
            $config->assessment = $ass->toArray();


        return response($config);
    }

}
