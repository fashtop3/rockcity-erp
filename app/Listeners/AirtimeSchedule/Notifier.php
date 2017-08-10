<?php
/**
 * Created by PhpStorm.
 * User: dfash
 * Date: 6/7/16
 * Time: 3:09 PM
 */

namespace App\Listeners\AirtimeSchedule;


use App\Events\ScheduleHasBeenPlaced;
use App\Models\Airtime\ScheduleAlert;
use Carbon\Carbon;

abstract class Notifier
{

    /**
     * @param ScheduleHasBeenPlaced $event
     */
    protected function updateNotifier(ScheduleHasBeenPlaced $event)
    {
        $alert = ScheduleAlert::find($event->schedule->scheduleAlert->id);
        $alert->increment('mail');

        $alert->sent_at = Carbon::now();
        $alert->resend_at = Carbon::now()->addMinutes(20);

        $alert->save();
    }

}