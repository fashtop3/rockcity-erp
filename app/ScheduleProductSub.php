<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleProductSub extends Model
{
    protected $fillable = [
//        'schedule_id',
        'schedule_product_id',
        'subscription'
    ];


    public function setSubscriptionAttribute($subscription)
    {
        $this->attributes['subscription'] = serialize($subscription);
    }

    public function getSubscriptionAttribute($subscription)
    {
        return unserialize($subscription);
    }

    public function slotDetails()
    {
        return $this->hasMany('App\ScheduleProductSubDetail');
    }

    public function schProduct()
    {
        return $this->belongsTo('App\ScheduleProduct');
    }
}