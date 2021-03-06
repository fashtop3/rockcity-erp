<?php
/**
 * Created by PhpStorm.
 * User: dfash
 * Date: 6/7/16
 * Time: 9:49 AM
 */

namespace App\Mailers;


use App\Models\Airtime\Schedule;
use App\User;

class ScheduleMailer extends Mailer
{

    public function sendAlertToHeadOfMarketing(Schedule $schedule, $subject)
    {
        $user = (object) ['email' => User::Contact_Marketing];
        $subject = $subject . '(Order No: '. $schedule->order_no .')';
        $view = 'emails.airtime';
        $data = [ 'schedule' => $schedule ];

        $this->sendTo($user, $subject, $view, $data);

    }

    public function sendAlertToHeadOfAccounting(Schedule $schedule, $subject)
    {
        $user = (object) ['email' => User::Contact_Account];
        $subject = $subject . '(Order No: '. $schedule->order_no .')';
        $view = 'emails.airtime';
        $data = [ 'schedule' => $schedule ];

        $this->sendTo($user, $subject, $view, $data);

    }

    public function sendAlertToExecutiveDirector(Schedule $schedule, $subject)
    {
        $user = (object) ['email' => User::Contact_ED];
        $subject = $subject . '(Order No: '. $schedule->order_no .')';
        $view = 'emails.airtime';
        $data = [ 'schedule' => $schedule ];

        $this->sendTo($user, $subject, $view, $data);

    }

    public function sendAlertToAdministrator(Schedule $schedule, $subject)
    {
        $user = (object) ['email' => User::Contact_Admin];
        $subject = $subject . '(Order No: '. $schedule->order_no .')';
        $view = 'emails.airtime';
        $data = [ 'schedule' => $schedule ];

        $this->sendTo($user, $subject, $view, $data);

    }

    public function sendApprovalToTraffic(Schedule $schedule, $subject)
    {
        $user = (object) ['email' => User::Contact_Traffic];
        $subject = $subject . '(Order No: '. $schedule->order_no .')';
        $view = 'emails.airtime';
        $data = [ 'schedule' => $schedule ];

        $this->sendTo($user, $subject, $view, $data);

    }
}