<?php

namespace App\Listeners\AirtimeSchedule;

use App\Events\ScheduleHasBeenPlaced;
use App\Mailers\ScheduleMailer;
use App\ScheduleAlert;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyExecutiveDirector extends Notifier
{
    private $mailer;

    public function __construct(ScheduleMailer $mailer)
    {
        //
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

        if($event->schedule->scheduleAlert->mail == ScheduleAlert::CRON_TO_APPROVE) {

            //not validate_signed
            if(!$event->schedule->scheduleAlert->validate_signed) {

                $event->schedule->bg_colour = 'lightgrey';

                $this->mailer->sendAlertToExecutiveDirector($event->schedule, 'Airtime Order Alert for Approval ');

                $this->updateNotifier($event);
            }
        }

    }
}
