<?php

namespace App\Http\Controllers;

use App\Schedule;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//
use Illuminate\Support\Facades\Auth;
use PDF;

class PDFController extends Controller
{

    public function __construct() {

        $this->middleware('auth.basic');

    }
    //
    public function getPdf()
    {

        dd(Auth::user());
//        $pdf = PDF::loadView('airtime.generate');
//        return $pdf->stream('invoice.pdf');

//        $pdf = PDF::loadView('pdf.invoice', $data);
//        return $pdf->download('invoice.pdf');

//        $html = view('emails.mailout')->render();
//
//        return PDF::load($html)->download();
    }

    public function airtimePDF($id)
    {
        $schedule = Schedule::find($id);

        if(!$schedule)
            dd('not found');


        $schedule->user->toArray();
        $schedule->client->toArray();
        $schedule->subscriptions->toArray();

        foreach($schedule->subscriptions as $subscription) {
            $subscription->product->toArray();
            $det = $subscription->details->toArray();

            foreach($det as $d)
                $subscription['totalAmount'] += $d['amount'];

            $subscription['detailsCount'] += count($det);
        }

        $totalAmount = 0;

        return view('pdf.airtime', compact('schedule', 'totalAmount'));

        $pdf = PDF::loadView('pdf.airtime', compact('schedule', 'totalAmount'));
        return $pdf->stream('airtime_order.pdf');
    }
}
