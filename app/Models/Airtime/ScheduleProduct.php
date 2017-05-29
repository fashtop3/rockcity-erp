<?php

namespace App\Models\Airtime;

use Illuminate\Database\Eloquent\Model;

class ScheduleProduct extends Model
{
    protected $fillable = [
        'schedule_id',
        'product_id',
        'subscriptions',
    ];


    public function schedule()
    {
        return $this->belongsTo('App\Models\Airtime\Schedule');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Airtime\Product');
    }

    public function setSubscriptionsAttribute($subscriptions) {
        $this->attributes['subscriptions'] = serialize($subscriptions);
    }

    public function getSubscriptionsAttribute($subscriptions) {
        return collect(unserialize($subscriptions));
    }
}
