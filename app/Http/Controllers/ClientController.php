<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->middleware('auth');

        $this->user = Auth::user();
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
            return response($clients);
        }
        return response('No clients found', 422);
    }

    public function getAllClients()
    {
        $clients = Client::all();
        if($clients) {
            return response($clients);
        }
        return response('No clients found', 422);
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
            'name' => 'required|string',
            'street_no' => 'required|string',
            'street_name' => 'required|string',
            'town' => 'required|string',
            'title' => 'required|alpha|min:2,max:6',
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'mobile' => 'required|numeric',
            'email' => 'sometimes|required|email',
        ]);

        if($validator->fails()) {
            return response($validator->errors()->all(), 422);
        }

        //check if mail exists
        if(Client::mailExits($request->get('email'))) {
            return response('Client email already exists!', 403);
        }

        $input = $request->all();
        $input['user_id'] = $this->user->id;

        try{
            Client::create($input);
            return response('Client\'s data saved successfully');
        }
        catch(\Exception $e) {
            return response('Error: client\'s data Exists', 403);
        }
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
            return response($client);
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
            'street_no' => 'required|string|min:3',
            'street_name' => 'required|string|min:3',
            'town' => 'required|string|min:3',
            'title' => 'required|alpha|min:2,max:6',
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
        if($client->user_id != $this->user->id) {

            //if the current user is not an admin or ....
            if(!$this->user->is('admin|executive.director|head.marketing')) {
                return response('You are not authorized to delete client', 403);
            }
        }
        if(!$client) {
            return response('No record found', 403);
        }
        $client->update($request->all());

        return response(['data'=>'Client data updated successfully']);
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
        if(!$client) {
            return response('Client doesn\'t exists', 403);
        }
        //if account is not created by the current user
        if($client->user_id != $this->user->id) {

            //if the current user is not an admin or ....
            if(!$this->user->is('admin|executive.director|head.marketing')) {
                return response('You are not authorized to delete client', 403);
            }
        }
        if(!empty($client->schedules()->get()->first())) {
            $client->delete();
            return response(['data'=>'Client has been moved to trash']);
        }

        $client->forceDelete();
        return response(['data'=>'Client deleted successfully']);
    }
}
