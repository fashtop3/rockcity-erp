<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $fillable = ['report_id', 'htmlText', 'completed'];

    public function report()
    {
        return $this->belongsTo('App\Report');
    }
}
