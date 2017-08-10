<?php

namespace App\Events;

use App\Events\Event;
use App\Models\PasswordResets;
use App\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserRequestReset extends Event
{
    use Dispatchable, InteractsWithSockets,  SerializesModels;
    /**
     * @var User
     */
    public $user;
    /**
     * @var PasswordResets
     */
    public $reset;


    /**
     * @param User $user
     * @param PasswordResets $reset
     */
    public function __construct(User $user, PasswordResets $reset)
    {
        //
        $this->user = $user;
        $this->reset = $reset;
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
