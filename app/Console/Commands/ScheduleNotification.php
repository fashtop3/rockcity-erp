<?php

namespace App\Console\Commands;

use App\Events\ScheduleHasBeenPlaced;
use App\Schedule;
use App\ScheduleAlert;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Mail\Mailer;
use Illuminate\Support\Facades\Event;

class ScheduleNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:schedules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check unapproved schedules and send notifications to the controllers';

    /**
     * Mailer service
     * @var Mailer
     */
    protected $mailer;


    /**
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer)
    {
        parent::__construct();

        $this->mailer = $mailer;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $notApproved = ScheduleAlert::where('mail', '<', '4')->get();

        $notApproved->each(function($item, $key) {

            if(Carbon::now() > $item->resend_at) {

                $schedule = Schedule::find($item->schedule_id);
                $schedule->scheduleAlert->toArray();
                $schedule->client->toArray();
                $schedule->subscriptions->toArray();

                foreach ($schedule->subscriptions as $subscription) {
                    $subscription->product->toArray();
                    $det = $subscription->details->toArray();

                    foreach($det as $d) {
                        $subscription->totalAmount += $d['amount'];
                        $subscription->totalSubChargePrice += $d['subChargePrice'];
                    }

                    $schedule->broadcasts += count($det);
                }

                Event::fire(new ScheduleHasBeenPlaced($schedule));
            }

        });

        $this->info('Notification sent successfully');
    }
}
