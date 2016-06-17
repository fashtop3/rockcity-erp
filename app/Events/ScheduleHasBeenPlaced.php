<?php

namespace App\Events;

use App\Events\Event;
use App\Schedule;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ScheduleHasBeenPlaced extends ScheduleEvent
{
    use SerializesModels;

    public $schedule;


    /**
     * @param Schedule $schedule
     */
    public function __construct(Schedule $schedule)
    {
        $this->schedule = $schedule;

//        $this->setBackgroundColour();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }

//    protected function setBackgroundColour()
//    {
//        $alert = $this->schedule->scheduleAlert;
//        $this->schedule->bg_colour = 'lightgrey';
//
//        //disables cron jobs
//        if($alert->mail >= 4) {
//            if($alert->validate && $alert->validate_signed) {
//                $this->schedule->bg_colour = 'gold';
//            }
//
//            if ($alert->recommend && $alert->recommend_signed) {
//                $this->schedule->bg_colour = 'Orange';
//            }
//
//            if($alert->approved && $alert->approved_signed) {
//                $this->schedule->bg_colour = 'lightgreen';
//            }
//
//            if (!$alert->approved && $alert->approved_signed) {
//                $this->schedule->bg_colour = 'red';
//            }
//
//            if($alert->programme && $alert->programme_signed) {
//                $this->schedule->bg_colour = 'paleturquoise';
//            }
//
//        }
//
//    }
}
