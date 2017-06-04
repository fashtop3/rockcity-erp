<?php

namespace App\Models\Assessment;

use Illuminate\Database\Eloquent\Model;

class AssessmentPartTwo extends Model
{
    protected $fillable = [
        'assessment_id',
        'review',
        'performance',
    ];

    public function setReviewAttribute($review) {

        $this->attributes['review'] = serialize($review);
    }

    public function getReviewAttribute($review) {

//        return $this->attributes['review'] = unserialize($review);
        return unserialize($review);
    }

    public function setPerformanceAttribute($performance) {

        $this->attributes['performance'] = serialize($performance);
    }

    public function getPerformanceAttribute($performance) {

//        return $this->attributes['performance'] = unserialize($performance);
        return unserialize($performance);
    }

    public function assessment() {
        return $this->belongsTo('App\Models\Assessment\Assessment');
    }
}
