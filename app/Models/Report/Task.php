<?php

namespace App\Models\Report;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['report_id', 'htmlText', 'completed', 'grade'];

    public function report()
    {
        return $this->belongsTo('App\Models\Report\Report');
    }
}
