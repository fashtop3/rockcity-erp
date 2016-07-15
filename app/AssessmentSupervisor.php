<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssessmentSupervisor extends Model
{
    protected $fillable =  ['user_id', 'assessment_id', 'preview', 'attributes', 'habit', 'leadership'];

    public function getAttributesAttribute($attributes)
    {
        return unserialize($attributes);
    }

    public function setAttributesAttribute($attributes)
    {
        $this->attributes['attributes'] = serialize($attributes);
    }

    public function getHabitAttribute($habit)
    {
        return unserialize($habit);
    }

    public function setHabitAttribute($habit)
    {
        $this->attributes['habit'] = serialize($habit);
    }

    public function getLeadershipAttribute($leadership)
    {
        return unserialize($leadership);
    }

    public function setLeadershipAttribute($leadership)
    {
        $this->attributes['leadership'] = serialize($leadership);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
