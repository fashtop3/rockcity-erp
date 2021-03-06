<?php

namespace App\Http\Controllers\Main;

use App\Events\SendReportToMailbox;
use App\Http\Requests\StaffReportStoreRequest;
use App\Models\Report\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class StaffReportController extends Controller
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
        $reports = auth()->user()->reports()
            ->with('challenges')
            ->with('tasks')
            ->with('remittances')->latest()->paginate(100);

        return view('main.report.staff.index', compact('reports'));
    }

    public function admin_index()
    {
        $reports = Report::with('challenges')
            ->with('tasks')
            ->with('remittances')->latest()->paginate(100);

        return view('main.report.staff.admin-index', compact('reports'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.report.staff.create');
    }


    /**
     * @param StaffReportStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StaffReportStoreRequest $request)
    {
        $task['htmlText'] = $request->get('task');
        $task['completed'] = $request->get('completed');
        $task['grade'] = $request->get('grade');

        $challenge['htmlText'] = $request->get('challenge');

        $remittance['target_id'] = $request->get('target_id');
        $remittance['client'] = $request->get('client');
        $remittance['amount'] = $request->get('amount');

        try{
            $report = auth()->user()->reports()->create([]);
            if(!empty($task['task'])) {
                $report->tasks()->create($task);
            }

            if(!empty($challenge['challenge'])) {
                $report->challenges()->create($task);
            }


            $report->remittances()->create($remittance);

//            $request->file('uploads')->store('staff/reports');
            if(count($request->file())) {
                foreach($request->file('uploads') as $file) {
                    if($file->isValid()) {
                        $filename = $file->store('staff/reports');
                        $report->uploads()->create(['filename' => $filename]);
                    }
                }
            }

            $this->sendReportToMails($report);
        }
        catch(\Exception $e) {
            if($e->getCode() == 23000) {
                Session::flash('error', 'Integrity constraint violation');
            }
        }

        return redirect()->route('report.staff');
    }

    private function sendReportToMails($report)
    {
//        $report->user->toArray();
//        $report->tasks->toArray();
//        $report->challenges->toArray();
//        $report->remittances->toArray();
        $report['taskCount'] = 0;
        $report['challengeCount'] = 0;
        event(new SendReportToMailbox($report));
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
