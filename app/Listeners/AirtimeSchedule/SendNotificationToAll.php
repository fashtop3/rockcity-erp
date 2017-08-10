<?php

namespace App\Listeners\AirtimeSchedule;

use App\Events\ScheduleHasBeenPlaced;
use App\Mailers\ScheduleMailer;
use App\ScheduleAlert;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendNotificationToAll
{
    /**
     * @var ScheduleMailer
     */
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
        if($event->schedule->scheduleAlert->mail >= ScheduleAlert::DISABLED_CRON) {

            //do for validate
            $this->doValidate($event);

            //do for recommend
            $this->doRecommend($event);

            //do for approval
            $this->doApprove($event);

            //do for programme
            $this->doProgramme($event);
        }
    }

    /**
     * @param ScheduleHasBeenPlaced $event
     * @param $msg
     */
    protected function sendToAll(ScheduleHasBeenPlaced $event, $msg)
    {
        $this->mailer->sendAlertToHeadOfMarketing($event->schedule, $msg);
        $this->mailer->sendAlertToHeadOfAccounting($event->schedule, $msg);
        $this->mailer->sendAlertToExecutiveDirector($event->schedule, $msg);
        $this->mailer->sendAlertToAdministrator($event->schedule, $msg);
    }

    /**
     * @param ScheduleHasBeenPlaced $event
     */
    protected function doValidate(ScheduleHasBeenPlaced $event)
    {
        if ($event->schedule->scheduleAlert->mail == ScheduleAlert::VALIDATED) {

            //send validated message to all
            if ($event->schedule->scheduleAlert->validate) {
                $msg = "Airtime Order has been validated ";
                $event->schedule->bg_colour = 'gold';
                $this->sendToAll($event, $msg);
            }
        }

        return;
    }

    /**
     * @param ScheduleHasBeenPlaced $event
     */
    protected function doRecommend(ScheduleHasBeenPlaced $event)
    {
        if ($event->schedule->scheduleAlert->mail == ScheduleAlert::RECOMMENDED) {

            //send validated message to all
            if ($event->schedule->scheduleAlert->recommend) {
                $msg = "Airtime Order has been Recommended ";
                $event->schedule->bg_colour = 'orange';
                $this->sendToAll($event, $msg);
            }
        }

        return;
    }

    /**
     * @param ScheduleHasBeenPlaced $event
     */
    protected function doApprove(ScheduleHasBeenPlaced $event)
    {
        if ($event->schedule->scheduleAlert->mail == ScheduleAlert::APPROVED) {

            //send Approval message to all
            if ($event->schedule->scheduleAlert->approved) {
                $msg = "Airtime Order has been Approved ";
                $event->schedule->bg_colour = 'lightgreen';
                $this->sendToAll($event, $msg);
                $this->mailer->sendApprovalToTraffic($event->schedule, $msg);
            }
            //send Reject Approval message to all
            elseif (!$event->schedule->scheduleAlert->approved && $event->schedule->scheduleAlert->approved_signed) {
                $msg = "Airtime Order has been Rejected ";
                $event->schedule->bg_colour = 'red';
                $this->sendToAll($event, $msg);
                $this->mailer->sendApprovalToTraffic($event->schedule, $msg);
            }
        }

        return;
    }

    /**
     * @param ScheduleHasBeenPlaced $event
     */
    protected function doProgramme(ScheduleHasBeenPlaced $event)
    {
        if ($event->schedule->scheduleAlert->mail == ScheduleAlert::PROGRAMMED) {

            //send validated message to all
            if ($event->schedule->scheduleAlert->programme) {
                $msg = "Airtime Order has been Programmed ";
                $event->schedule->bg_colour = 'paleturquoise';
                $this->sendToAll($event, $msg);
                $this->mailer->sendApprovalToTraffic($event->schedule, $msg);
            }
        }

        return;
    }
}
