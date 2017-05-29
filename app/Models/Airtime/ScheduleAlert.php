<?php

namespace App\Models\Airtime;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ScheduleAlert extends Model
{
    //0-3 only works for cron jobs
    const CRON_TO_VALIDATE = 0;
    const CRON_TO_RECOMMEND = 1;
    const CRON_TO_RECOMMEND_2 = 2;
    const CRON_TO_APPROVE = 3;

    //disables cron jobs
    const DISABLED_CRON = 4;

    //5-8 only works for normal mail notification
    //check sendNotificationToAll.php in listeners folder
    const VALIDATED = 5;
    const RECOMMENDED = 6;
    const APPROVED = 7;
    const PROGRAMMED = 8;

    protected $fillable = [
        'schedule_id',
        'approved',
        'user_id',
        'mail',
        'signed',
        'token',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'validate' => 'boolean',
        'recommend' => 'boolean',
        'programme' => 'boolean',
    ];

    protected $dates = ['signed', 'sent_at', 'resend_at'];

    public function setSignedAttribute()
    {
        $this->attributes['signed'] = Carbon::now();
    }


    public function schedule()
    {
        return $this->belongsTo('App\Models\Airtime\Schedule');
    }
}
