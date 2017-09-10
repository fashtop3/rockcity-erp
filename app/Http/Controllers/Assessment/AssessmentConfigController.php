<?php

namespace App\Http\Controllers\Assessment;

use App\Models\Assessment\AssessmentConfig;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Mockery\CountValidator\Exception;

class AssessmentConfigController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:'. User::RegisterStaffRoles);
    }
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
        $validator = Validator::make($request->all(), [
            'enable' => 'required|boolean',
            'starts' => 'required|date',
            'ends' =>  'required|date'
        ]);

        try{
            if($validator->fails()) {
                Session::flash('error', 'Settings not valid');
                throw new Exception;
            }

            $input =  $request->all();
            $input['user_id'] = Auth::user()->id;

            AssessmentConfig::checkResetAll($input['enable']);

            AssessmentConfig::create($input);
            //Todo: send mails to all staff
            Session::flash('success', 'New settings enabled; notifications sent to all staff');

        }
        catch(\Exception $e) {

        }

        return redirect()->back();
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
//        DB::beginTransaction();

        try{
            $config = AssessmentConfig::find($id);

            if(empty($config->assessments->toArray())) {
                $config->forceDelete();
            }
            else {
                $config->delete(); //soft deletes
            }
            Session::flash('success', 'Schedule deleted successfully');
        }

        catch(\Exception $e) {
            Session::flash('error', 'Schedule not found');
        }

        return redirect()->back();
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
