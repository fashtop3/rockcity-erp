<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssessmentPartOne extends Model
{
    protected $fillable = [
        'assessment_id',
        'personal',
        'qualifications'
    ];
}
