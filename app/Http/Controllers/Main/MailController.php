<?php

namespace App\Http\Controllers\Main;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MailController extends Controller
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
        return view('main.mail');
    }


    public function sendCustomMail(Request $request) {

        //Todo: design mail template

        dd($request->all());

        $user = Auth::user();

        $data['content'] = $request->get('msg');


        try {
//            \Mail::send('emails.mailout', $data, function ($message) use ($user, $request) {
//
//                $message->from($user->email, $user->getFullName());
//                $message->to($request->get('to'));
//                $message->subject($request->get('subject'));
//
//                if (!empty($request->get('cc')))
//                    $message->cc($request->get('cc'));
//
//                if (!empty($request->get('bcc')))
//                    $message->bcc($request->get('bcc'));
//            });

            Session::flash('success', 'Mail sent');

        }
        catch(\Exception $e) {
            Session::flash('error', 'Mail sent');
        }

        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
