<?php

namespace App\Http\Controllers\RCAdmin;

use App\Http\Requests\TargetStoreRequest;
use App\Models\Admin\Target;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class TargetController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin|executive.director|administration.dept',
            ['only' => ['store', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $targets = Target::orderBy('id', 'desc')->paginate(100);

        return view('main.target.index', compact('targets'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.target.create');
    }


    /**
     * @param TargetStoreRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function store(TargetStoreRequest $request)
    {
        try{
            auth()->user()->targets()->create($request->all());
            Session::flash('success', 'Target added successfully');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Failed to add new target');
            return redirect()->back()->withInput();
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
            $target = Target::findOrFail($id);
        }
        catch(\Exception $e){
            Session::flash('error', 'Target not found');
            return redirect()->back();
        }

        return view('main.target.edit', compact('target'));
    }


    /**
     * @param TargetStoreRequest $request
     * @param $id
     * @return $this
     */
    public function update(TargetStoreRequest $request, $id)
    {
        try{
            $target = Target::findOrFail($id);

            $target->update($request->all());

            Session::flash('success', "Target updated");
        }
        catch(\Exception $e) {
//            dd($e->getMessage());
            Session::flash('error', "Target update failed!");
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
        DB::beginTransaction();
        try{
            $target = Target::findOrFail($id);

            $target->delete();
            Session::flash('success', 'Target deleted');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Target not found');
        }

        return redirect()->back();
    }
}
