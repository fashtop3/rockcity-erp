<?php
/**
 * Created by PhpStorm.
 * User: dfash
 * Date: 6/7/16
 * Time: 9:40 AM
 */

namespace App\Mailers;

use Illuminate\Mail\Mailer as Mail;

abstract class Mailer
{

    private $mail;

    public function __construct(Mail $mail)
    {

        $this->mail = $mail;
    }

    public function sendTo($user, $subject, $view, $data = [], $header = [ 'from'=>'noreply@rockcityfmradio.com', 'name' => 'Noreply'])
    {

        $this->mail->send($view, $data, function($message) use($user, $subject, $header)
        {

            $message->to($user->email)
                ->from($header['from'], $header['name'])
                ->subject($subject);

        });
    }

    public function sendReportTo($user, $subject, $view, $data = [])
    {

        $this->mail->send($view, $data, function($message) use($user, $subject)
        {

            $message->to($user->email)
                ->subject($subject);

            $message->from('noreply@rockcityfmradio.com', 'Report');

        });
    }
}