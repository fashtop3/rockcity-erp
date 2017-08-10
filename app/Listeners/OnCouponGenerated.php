<?php

namespace App\Listeners;

use App\Events\CouponGeneratedEvent;
use Carbon\Carbon;
use Illuminate\Mail\Mailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OnCouponGenerated
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    protected $mailer;
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * Handle the event.
     *
     * @param  CouponGeneratedEvent  $event
     * @return void
     */
    public function handle(CouponGeneratedEvent $event)
    {
        $text = 'New Generated Coupon! please find the attached file';
        $this->mailer->raw($text, function($message) use($event)
        {
            $filename = 'Coupon_'.str_replace(' ', '_', Carbon::now()->toDateTimeString()).'.xls';

            $message->to(Auth::user()->email)
                ->from('noreply@rockcityfmradio.com', 'Noreply')
                ->subject($event->data['subject'])
                ->attachData($event->data['coupon'], $filename);

        });
    }
}
