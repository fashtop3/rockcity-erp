<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleProductSubDetail extends Model
{
    protected $fillable = [
//        'schedule_id',
        'schedule_product_sub_id',
        'schedule'
    ];


    //set methods

    public function setScheduleAttribute($schedule)
    {
        $this->attributes['schedule'] = serialize($schedule);
    }

    public function getScheduleAttribute($schedule)
    {
        return unserialize($schedule);
    }

    public function schProductSub()
    {
        return $this->belongsTo('App\ScheduleProductSub');
    }
}