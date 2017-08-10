<?php

namespace App\Listeners\AirtimeSchedule;

use App\Events\ScheduleHasBeenPlaced;
use App\Mailers\ScheduleMailer;
use App\Models\Airtime\ScheduleAlert;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyHeadOfAccounting extends Notifier
{

    private $mailer;


    /**
     * @param ScheduleMailer $mailer
     */
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
        //mail == 1
        if($event->schedule->scheduleAlert->mail == ScheduleAlert::CRON_TO_RECOMMEND ||
            $event->schedule->scheduleAlert->mail == ScheduleAlert::CRON_TO_RECOMMEND_2) {

            //not validate_signed
            if(!$event->schedule->scheduleAlert->validate_signed) {

                $event->schedule->bg_colour = 'lightgrey';

                $this->mailer->sendAlertToHeadOfAccounting($event->schedule, 'Airtime Order Alert for Recommendation ');

                $this->updateNotifier($event);
            }

        }


    }
}
