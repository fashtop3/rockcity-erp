<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssessmentPartThree extends Model
{
    protected $fillable = [
        'assessment_id',
        'competencies',
    ];

    public function setCompetenciesAttribute($competencies) {

        $this->attributes['competencies'] = serialize($competencies);
    }

    public function getCompetenciesAttribute($competencies) {

//        return $this->attributes['competencies'] = unserialize($competencies);
        return unserialize($competencies);
    }

    public function assessment() {
        return $this->belongsTo('App\Assessment');
    }
}
