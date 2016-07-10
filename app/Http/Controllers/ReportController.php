<?php

namespace App\Http\Controllers;

use App\Challenge;
use App\Events\SendReportToMailbox;
use App\Remittance;
use App\Report;
use App\ReportVehicle;
use App\Task;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use UploadefdFile;


class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.basic');
    }

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
        DB::beginTransaction();

        $report = Report::create(['user_id' => Auth::user()->id]);

        if($report) {

            $this->saveReportModules($request, $report);

            DB::commit();

            $this->sendReportToMails($report);

            return response('Report submitted successfully');
        }

        return response('Error submitting report', 403);

//        DB::commit();
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

    public function upload(Request $request)
    {
        $file = $request->all()['file'];

        dd($file);

//        $filename = 'user_'.'.'.$file->getClientOriginalExtension();
//        $file->move(public_path() .'/app/img/user/', $filename);
//
//        Upload::Create(['user_id' => $id, 'filename' => $filename, 'thumbnail' => $file->getRealPath()]);
//
//        return response('File uploaded successfully', 201);

    }

    /**
     * @param Request $request
     * @param $report
     */
    private function createTask(Request $request, $report)
    {
        $tasks = $request->get('tasks');
        foreach ($tasks as $task) {
            if (!empty($task)) {
                $task['report_id'] = $report->id;
                Task::create($task);
            }
        }
    }

    /**
     * @param Request $request
     * @param $report
     */
    private function createChallenge(Request $request, $report)
    {
        $challenges = $request->get('challenges');
        foreach ($challenges as $challenge) {
            if (!empty($challenge)) {
                $challenge['report_id'] = $report->id;
                Challenge::create($challenge);
            }
        }
    }

    /**
     * @param Request $request
     * @param $report
     */
    private function createRemittance(Request $request, $report)
    {
        $remittances = $request->get('remittances');
        foreach ($remittances as $remittance) {
            if (!empty($remittance)) {
                $remittance['report_id'] = $report->id;
                $remittance['target_id'] = $remittance['target']['id'];
                Remittance::create($remittance);
            }
        }
    }

    /**
     * @param $report
     */
    private function sendReportToMails($report)
    {
        $report->user->toArray();
        $report->tasks->toArray();
        $report->challenges->toArray();
        $report->remittances->toArray();

        $report['taskCount'] = 0;
        $report['challengeCount'] = 0;

        Event::fire(new SendReportToMailbox($report));
    }

    /**
     * @param Request $request
     * @param $report
     */
    private function saveReportModules(Request $request, $report)
    {
        $this->createTask($request, $report);
        $this->createChallenge($request, $report);
        $this->createRemittance($request, $report);
    }

}
