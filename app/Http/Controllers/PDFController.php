<?php

namespace App\Http\Controllers;

use App\Schedule;
use Carbon\Carbon;
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

        if(!$schedule) {
            return response('Airtime not found', 403);
        }

        $schedule->user->toArray();
        $schedule->client->toArray();
        $schedule->schProducts->toArray();

        foreach($schedule->schProducts as $product) {
            $product->product->toArray();
            $product->schProductSubs->toArray();
            foreach($product->schProductSubs as $schProductSub) {
                if(!empty($schProductSub->slotDetails()->get())) {
                    $schProductSub->slotDetails->toArray();
                }
                $product['totals'] += $schProductSub->subscription['amount'];
            }

            $schedule['totals'] += $product['totals'];
        }


//        foreach($schedule->subscriptions as $subscription) {
//            $subscription->product->toArray();
//            $det = $subscription->details->toArray();
//
//            foreach($det as $d)
//                $subscription['totalAmount'] += $d['amount'];
//
//            $subscription['detailsCount'] += count($det);
//        }
//
//        $totalAmount = 0;

//        return view('pdf.airtime', compact('schedule', 'totalAmount'));
//        $pdf = PDF::loadView('pdf.airtime', compact('schedule', 'totalAmount'));

        return view('pdf.airtime', compact('schedule'));

        $pdf = PDF::loadView('pdf.airtime', compact('schedule'));
        return $pdf->stream('airtime_order.pdf');
    }

    public static function toFormat($date) {
        return Carbon::parse($date)->toFormattedDateString();
    }
}
