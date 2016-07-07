<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssessmentPartTwo extends Model
{
    protected $fillable = [
        'assessment_id',
        'review',
        'performance',
    ];
}
