<?php

namespace App\Listeners\ReportTo;

use App\Events\SendReportToMailbox;
use App\Mailers\ReportMailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class HeadOfAccountingMailbox
{


    /**
     * @var ReportMailer
     */
    private $mailer;

    /**
     * @param ReportMailer $mailer
     */
    public function __construct(ReportMailer $mailer)
    {
        //
        $this->mailer = $mailer;
    }

    /**
     * Handle the event.
     *
     * @param  SendReportToMailbox  $event
     * @return void
     */
    public function handle(SendReportToMailbox $event)
    {
        $this->mailer->sendReportHeadOfAccounting($event->report);
    }
}
