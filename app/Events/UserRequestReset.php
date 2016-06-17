<?php

namespace App\Events;

use App\Events\Event;
use App\PasswordResets;
use App\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserRequestReset extends Event
{
    use SerializesModels;
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
