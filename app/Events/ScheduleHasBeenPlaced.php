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
}
