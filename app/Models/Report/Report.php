<?php

namespace App\Models\Report;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function challenges()
    {
        return $this->hasMany('App\Models\Report\Challenge');
    }

    public function tasks()
    {
        return $this->hasMany('App\Models\Report\Task');
    }

    public function remittances()
    {
        return $this->hasMany('App\Models\Report\Remittance');
    }

    public function uploads()
    {
        return $this->hasMany('App\Models\Report\ReportUpload');
    }
}
