<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ScheduleDetail extends Model
{
    protected $fillable = [
        'schedule_id',
        'schedule_sub_id',
        'broadcast',
        'bulk_start_date',
        'bulk_end_date',
        'amount',
        'duration',
        'period',
        'subCharge',
        'subChargePrice',
        'fixedSpot',
        'trans_date',
        'hour',
        'min',
        'sec'
    ];

    protected $dates = ['bulk_start_date', 'bulk_end_date', 'trans_date' ];

    //set methods

    public function setBulkStartDateAttribute($date)
    {
        if(is_null($date))  return null;

        $this->attributes['bulk_start_date'] = Carbon::parse($date);
    }

    public function setBulkEndDateAttribute($date)
    {
        if(is_null($date))  return null;

        $this->attributes['bulk_end_date'] = Carbon::parse($date);
    }

    public function setTransDateAttribute($date)
    {
        if(is_null($date))  return null;

        $this->attributes['trans_date'] = Carbon::parse($date);
    }

    //get methods
    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->toAtomString();
    }

    public function getBulkStartDateAttribute($date)
    {
        if(is_null($date))  return null;

        return Carbon::parse($date)->toAtomString();
    }

    public function getBulkEndDateAttribute($date)
    {
        if(is_null($date))  return null;

        return Carbon::parse($date)->toAtomString();
    }

    public function getTransDateAttribute($date)
    {
        if(is_null($date))  return null;

        return Carbon::parse($date)->toAtomString();
    }


    public function subscription()
    {
        return $this->belongsTo('App\ScheduleSub');
    }
}
