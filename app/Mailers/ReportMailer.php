<?php
/**
 * Created by PhpStorm.
 * User: dfash
 * Date: 6/7/16
 * Time: 9:49 AM
 */

namespace App\Mailers;


use App\Report;

class ReportMailer extends Mailer
{

    public function sendReportToHeadOfMarketing(Report $report)
    {
        $user = (object) ['email' => 'fashtop3@gmail.com'];

        $this->sendReport($report, $user);
    }

    public function sendReportHeadOfAccounting(Report $report)
    {
        $user = (object) ['email' => 'fashtop3@gmail.com'];

        $this->sendReport($report, $user);
    }

    public function sendReportExecutiveDirector(Report $report)
    {
        $user = (object) ['email' => 'fashtop3@gmail.com'];

        $this->sendReport($report, $user);
    }

    public function sendReportToAdministrator(Report $report)
    {
        $user = (object) ['email' => 'fashtop3@gmail.com'];

        $this->sendReport($report, $user);


    }

    public function sendReportToTraffic(Report $report)
    {
        $user = (object) ['email' => 'fashtop3@gmail.com'];

        $this->sendReport($report, $user);
    }

    /**
     * @param Report $report
     * @param $user
     */
    protected function sendReport(Report $report, $user)
    {
        $subject = $report->user->getFullName() . '....Reporting';
        $view = 'emails.reports';
        $data = ['report' => $report, 'taskCount' => $report->tasksCount, 'challengeCount' => $report->challengeCount];

        $this->sendReportTo($user, $subject, $view, $data);
    }
}