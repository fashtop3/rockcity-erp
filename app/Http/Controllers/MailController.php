<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Mail;

class MailController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function sendCustomMail(Request $request) {

        //Todo: validate emails cc, bcc

        $user = Auth::user();

        $data['content'] = $request->get('msg');


        if(Mail::send('emails.mailout', $data, function($message) use($user, $request) {

            $message->from($user->email, $user->getFullName());
            $message->to($request->get('to'));
            $message->subject($request->get('subject'));

            if(!empty($request->get('cc')))
                $message->cc($request->get('cc'));

            if(!empty($request->get('bcc')))
                $message->bcc($request->get('bcc'));
        }))
        {
            return response('Mail sent');
        }

        return response('Mail not sent', 403);
    }
}
