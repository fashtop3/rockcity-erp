<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleSub extends Model
{
    protected $fillable = [
        'schedule_id',
        'product_id',
    ];

    public function schedule()
    {
        return $this->belongsTo('App\Schedule');
    }

    public function details()
    {
        return $this->hasMany('App\ScheduleDetail');
    }

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
