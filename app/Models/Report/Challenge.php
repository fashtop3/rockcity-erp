<?php

namespace App\Models\Report;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = [ 'report_id', 'htmlText' ];

    public function report()
    {
        return $this->belongsTo('App\Models\Report\Report');
    }
}
