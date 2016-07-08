<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AssessmentPartOne extends Model
{
    protected $fillable = [
        'assessment_id',
        'personal',
        'qualifications'
    ];


    public function setPersonalAttribute($personal) {

        $this->attributes['personal'] = serialize($personal);
    }

    public function getPersonalAttribute($personal) {

//        return $this->attributes['personal'] = unserialize($personal);
        return unserialize($personal);
    }

    public function setQualificationsAttribute($qualifications) {

        $this->attributes['qualifications'] = serialize($qualifications);
    }

    public function getQualificationsAttribute($qualifications) {

//        return $this->attributes['qualifications'] = unserialize($qualifications);
        return unserialize($qualifications);
    }

    public function assessment() {
        return $this->belongsTo('App\Assessment');
    }
}
