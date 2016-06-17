<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    protected $fillable = [ 'name', 'start_date', 'duration', 'user_id', 'amount'];

    protected $dates = ['start_date'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getStartDateAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->diffForHumans();
    }

    public function setStartDateAttribute($date)
    {
        return Carbon::parse($date);
    }
}
