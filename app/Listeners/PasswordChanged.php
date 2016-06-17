<?php

namespace App\Listeners;

use App\Events\UserChangedPassword;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordChanged
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserChangedPassword  $event
     * @return void
     */
    public function handle(UserChangedPassword $event)
    {
        //
    }
}
