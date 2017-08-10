<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],

        'App\Events\CouponGeneratedEvent' => [
            'App\Listeners\OnCouponGenerated',
        ],

        'App\Events\UserHasRegistered' => [
            'App\Listeners\EmailNotificationToUser',
        ],

        'App\Events\UserRequestReset' => [
            'App\Listeners\PasswordRequestMail',
        ],

        'App\Events\UserChangedPassword' => [
            'App\Listeners\PasswordChanged',
        ],

        'App\Events\ScheduleHasBeenPlaced' => [
            'App\Listeners\AirtimeSchedule\NotifyHeadOfMarketing',
            'App\Listeners\AirtimeSchedule\NotifyHeadOfAccounting',
            'App\Listeners\AirtimeSchedule\NotifyExecutiveDirector',
            'App\Listeners\AirtimeSchedule\NotifyAdministrator',
            'App\Listeners\AirtimeSchedule\SendNotificationToAll',
        ],

        'App\Events\SendReportToMailbox' => [
            'App\Listeners\ReportTo\HeadOfMarketingMailbox',
            'App\Listeners\ReportTo\HeadOfAccountingMailbox',
            'App\Listeners\ReportTo\NotifyExecutiveDirectorMailbox',
            'App\Listeners\ReportTo\AdministratorMailbox',
            'App\Listeners\ReportTo\TrafficMailbox',
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
