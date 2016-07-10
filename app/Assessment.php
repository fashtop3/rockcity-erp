<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = ['assessment_config_id', 'user_id', 'preview'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function partOne() {
        return $this->hasOne('App\AssessmentPartOne');
    }

    public function partTwo() {
        return $this->hasOne('App\AssessmentPartTwo');
    }

    public function partThree() {
        return $this->hasOne('App\AssessmentPartThree');
    }

    public function supervisor()
    {
        return $this->hasOne('App\AssessmentSupervisor');
    }

    public function config()
    {
        return $this->belongsTo('App\AssessmentConfig');
    }
}
