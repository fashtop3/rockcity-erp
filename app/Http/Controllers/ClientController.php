<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
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

        //only clients registered by current user
        $clients = Client::where('user_id', Auth::user()->id)->get();

        if($clients) {
            return response($clients, 201);
        }

        return response('No clients found', 422);
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
        $input = $request->all();

        //TODO: check if email exists

        if(Client::mailExits($request->get('email'))) {
            return response('Client email already exists!', 422);
        }

        $input['user_id'] = Auth::user()->id;

        if(!Client::create($input))
        {
            return response('Error saving client\'s data', 403);
        }

        return response('Client\'s data saved successfuly', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $client = Client::findOrFail($id);

        if($client) {
            return response($client, 201);
        }

        return response('Error client doesn\'t exists' , 403);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $client = Client::findOrFail($id);

        if($client) {
            return response($client, 201);
        }

        return response('Error client doesn\'t exists' , 403);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'address' => 'required|string|min:3',
            'title' => 'required|alpha|min:2,max:3',
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'mobile' => 'required|numeric',
            'email' => 'required|email',
        ]);


        if($validator->fails()) {
            return response($validator->errors()->all(), 422);
        }

        $client = Client::find($id);

        //check if client is created by current user
        if($client->user_id != Auth::user()->id) {
            return response('You are not authorized to update client', 401);
        }

        if(!$client) {
            return response('No record found', 422);
        }

        $client->update([
            'name'  => $request->get('name'),
            'address'   => $request->get('address'),
            'title' => $request->get('title'),
            'firstname' => $request->get('firstname'),
            'lastname'  => $request->get('lastname'),
            'mobile'    => $request->get('mobile'),
            'email'     => $request->get('email'),
        ]);

        return response('Client data updated successfully', 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        dd($client);

        if(!$client) {
            return response('Client doesn\'t exists', 400);
        }

        //check if client is created by current user
        if($client->user_id != Auth::user()->id) {
            return response('You are not authorized to delete client', 401);
        }



        if($client->delete()) {
            return response('Client deleted successfully', 200);
        }
    }
}
