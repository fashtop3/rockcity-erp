<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CouponGeneratedEvent extends Event
{
    use Dispatchable, InteractsWithSockets,  SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public $data;

    public function __construct($data = [])
    {
        $this->data = $data;
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
