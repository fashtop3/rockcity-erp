<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportUpload extends Model
{

    protected $fillable = ['report_id', 'filename', 'filepath'];

    public function report()
    {
        return $this->belongsTo('App\Report');
    }
}
