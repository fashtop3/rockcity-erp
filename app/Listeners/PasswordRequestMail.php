<?php

namespace App\Listeners;

use App\Events\UserRequestReset;
use App\Mailers\UserMailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordRequestMail
{
    /**
     * @var UserMailer
     */
    private $mailer;


    /**
     * @param UserMailer $mailer
     */
    public function __construct(UserMailer $mailer)
    {
        //
        $this->mailer = $mailer;
    }

    /**
     * Handle the event.
     *
     * @param  UserRequestReset  $event
     * @return void
     */
    public function handle(UserRequestReset $event)
    {
        $this->mailer->sendResetMessageTo($event->user, $event->reset);
    }
}
