<?php

namespace App\Models\Assessment;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = ['assessment_config_id', 'user_id', 'preview'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function partOne() {
        return $this->hasOne('App\Models\Assessment\AssessmentPartOne');
    }

    public function partTwo() {
        return $this->hasOne('App\Models\Assessment\AssessmentPartTwo');
    }

    public function partThree() {
        return $this->hasOne('App\Models\Assessment\AssessmentPartThree');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function supervisor()
    {
        return $this->hasOne('App\Models\Assessment\AssessmentSupervisor');
    }

    public function config()
    {
        return $this->belongsTo('App\Models\Assessment\AssessmentConfig', 'assessment_config_id');
    }
}
