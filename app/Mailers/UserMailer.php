<?php
/**
 * Created by PhpStorm.
 * User: dfash
 * Date: 6/7/16
 * Time: 9:49 AM
 */

namespace App\Mailers;


use App\PasswordResets;
use App\User;

class UserMailer extends Mailer
{

    /**
     * @param User $user
     */
    public function sendWelcomeMessageTo(User $user)
    {
        $subject = 'Welcome to Rockcity Order Platform';
        $view = 'emails.test';
        $data = [];

        $this->sendTo($user, $subject, $view, [], ['from'=>'support@rockcityfmradio.com', 'name' => 'Success']);

    }

    /**
     * @param User $user
     * @param PasswordResets $reset
     */
    public function sendResetMessageTo(User $user, PasswordResets $reset)
    {
        $subject = 'Your ERP details‏';
        $view = 'emails.reset';

        $link = "http://".$_SERVER['HTTP_HOST']."/#/page/recover/change?e=".urlencode($user->getEmailForPasswordReset())."&m=".urlencode($reset->token);

        $data = ['lastname' => $user->lastname, 'link' => $link];

        $this->sendTo($user, $subject, $view, $data);
    }
}