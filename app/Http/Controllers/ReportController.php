<?php

namespace App\Http\Controllers;

use App\Challenge;
use App\Events\SendReportToMailbox;
use App\Remittance;
use App\Report;
use App\ReportUpload;
use App\ReportVehicle;
use App\Task;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use UploadedFile;


class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.basic');
        $this->middleware('role:staff', ['only' => ['upload', 'store']]);
        $this->middleware('role:admin|executive.director|administration.dept', ['only' => ['getReports']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports = Report::where('user_id', Auth::user()->id)->latest()->get();

        foreach($reports as $report){
            $report->challenges->toArray();
            $report->tasks->toArray();
            $report->remittances->toArray();
            foreach($report->remittances as $remittance) {
                $remittance->target->toArray();
            }
            $report->uploads->toArray();
        }

        return response($reports);
    }

    public function getReports()
    {
        $reports = Report::latest()->get();

        foreach($reports as $report){
            $report->user->toArray();
            $report->challenges->toArray();
            $report->tasks->toArray();
            $report->remittances->toArray();
            foreach($report->remittances as $remittance) {
                $remittance->target->toArray();
            }
            $report->uploads->toArray();
        }

        return response($reports);
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
    }

    public function upload(Request $request)
    {
        $file = $request->file('file');

        $filename = Auth::user()->id.'_'.md5($file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
        $file->move(storage_path() .'/app/temp/', $filename);

        return response(['filename' => $filename, 'mime' => $file->getClientMimeType() ]);
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
        $this->createUpload($request, $report);
    }

    /**
     * @param Request $request
     * @param $report
     */
    protected function createUpload(Request $request, $report)
    {
        if (!empty($request->get('uploadedFiles'))) {
            foreach ($request->get('uploadedFiles') as $upload) {
                $path = storage_path() . '/app/temp/' . $upload['filename'];
                if (file_exists($path)) {
                    $file = new ReportUpload;
                    $file->filename = $upload['filename'];
                    $file->mime = $upload['mime'];
                    $report->uploads()->save($file);
                    Storage::move('temp/' . $upload['filename'], 'report/' . $report->id.'_'.$upload['filename']);
                }
            }
        }
    }

}
