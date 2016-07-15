<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DriverReport extends Model
{
    //mass assignment
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'info',
        'html_text'
    ];

    /**
     * A setter method called when a form is submitted
     *
     * @param $info
     * @internal param $date
     */
    public function setInfoAttribute($info)
    {
        $this->attributes['info'] = serialize($info);
    }


    /**
     * A setter method when a form is submitted
     *
     * @param $info
     * @return mixed
     * @internal param $date
     */
    public function getInfoAttribute($info)
    {
        return unserialize($info);
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
