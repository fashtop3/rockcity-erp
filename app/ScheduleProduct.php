<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleProduct extends Model
{
    protected $fillable = [
        'schedule_id',
        'product_id',
    ];


    public function schedule()
    {
        return $this->belongsTo('App\Schedule');
    }

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function schProductSubs()
    {
        return $this->hasMany('App\ScheduleProductSub');
    }
}