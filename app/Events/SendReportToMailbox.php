<?php

namespace App\Events;

use App\Events\Event;
use App\Models\Report\Report;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SendReportToMailbox extends Event
{
    use Dispatchable, InteractsWithSockets,  SerializesModels;
    /**
     * @var Report
     */
    public $report;


    /**
     * @param Report $report
     */
    public function __construct(Report $report)
    {
        //
        $this->report = $report;
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
