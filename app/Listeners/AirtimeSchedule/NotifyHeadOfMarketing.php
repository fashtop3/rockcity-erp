<?php

namespace App\Listeners\AirtimeSchedule;

use App\Events\ScheduleHasBeenPlaced;
use App\Mailers\ScheduleMailer;
use App\ScheduleAlert;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyHeadOfMarketing extends Notifier
{

    private $mailer;


    /**
     * @param ScheduleMailer $mailer
     */
    public function __construct(ScheduleMailer $mailer)
    {

        $this->mailer = $mailer;
    }

    /**
     * Handle the event.
     *
     * @param  ScheduleHasBeenPlaced  $event
     * @return void
     */
    public function handle(ScheduleHasBeenPlaced $event)
    {
        //enabled for cron jobs
        if($event->schedule->scheduleAlert->mail == ScheduleAlert::CRON_TO_VALIDATE) {

            $event->schedule->bg_colour = 'lightgrey';
            $this->mailer->sendAlertToHeadOfMarketing($event->schedule, 'Airtime Order Alert for validation ');

            $this->updateNotifier($event);
        }

    }

}
