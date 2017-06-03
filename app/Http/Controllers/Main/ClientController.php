<?php

namespace App\Http\Controllers\Main;

use App\Http\Requests\ClientCreateRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Yajra\Datatables\Datatables;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = auth()->user()->clients()->paginate(100);
        return view('main.client.index', compact('clients'));
    }


    /**
     * Process dataTable ajax response.
     *
     * @param \Yajra\Datatables\Datatables $datatables
     * @return \Illuminate\Http\JsonResponse
     */
    public function data(Datatables $datatables)
    {
        $query = auth()->user()->clients()->get();

        return $datatables->collection($query)
            ->addColumn('action', function ($query) {
                return '<a href="'. route('client.edit', ['id' => $query->id]) .'" class="btn btn-sm btn-warning"><em class="fa fa-edit"></em></a> '
                . ' <a href="'. route('client.edit', ['id' => $query->id]) .'" class="btn btn-sm btn-danger"><em class="fa fa-trash-o"></em></a>';
            })
//            ->addColumn('action', 'vendor.datatables.buttons.clients-action')
            ->make(true);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('main.client.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientCreateRequest $request)
    {
        try {
            auth()->user()->clients()->create($request->all());
            Session::flash('success', 'New client was added.');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Error failed to create new client data');

            return redirect()->back()->withInput($request->all());
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
        try {
            $client = Client::findOrFail($id);
        }
        catch(\Exception $e)
        {
            Session::flash('error', "Client not found");
            return redirect()-route('client');
        }

        return view('main.client.edit', compact('client'));
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
        try {
            $client = Client::findOrFail($id);
            $client->update($request->all());
            Session::flash('success', 'Client profile updated.');
        }
        catch(\Exception $e)
        {
            Session::flash('error', "Client not found");
            return redirect()-route('client');
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
        DB::beginTransaction();
        try{
            $client = Client::findOrFail($id);

            $client->delete();
            Session::flash('success', 'Client has been deleted');
        }
        catch(\Exception $e) {
            Session::flash('error', 'Client not found');
            if($e->getCode() == 403) {
                Session::flash('error', $e->getMessage());
            }
        }
        return redirect()->back();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminIndex()
    {
        $clients = Client::paginate(100);
        return view('main.client.index', compact('clients'));
    }

}
