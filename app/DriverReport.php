<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DriverReport extends Model
{
    //mass assignment
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'time_inspect',
        'water_level',
        'oil_level',
        'fuel_level',
        'break_condition',
        'absorber_condition',
        'time_washed'
    ];

    //create a carbon instance
    protected $dates = [ 'time_inspect', 'time_washed' ];

    /**
     * A setter method called when a form is submitted
     *
     * @param $date
     */
    public function setTimeInspectAttribute($date)
    {
        //Todo: create time format here
    }


    /**
     * A setter method when a form is submitted
     *
     * @param $date
     */
    public function setTimeWashedAttribute($date)
    {
        //Todo: create time format here
    }

    /**
     * this report belongs to a particular vehicle
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vehicle()
    {
        return $this->belongsTo('App\Vehicle');
    }


    /**
     * This vehicle report belongs to a user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
