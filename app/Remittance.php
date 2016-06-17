<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Remittance extends Model
{
    protected $fillable = ['report_id', 'target_id', 'client', 'amount'];

    public function report()
    {
        return $this->belongsTo('App\Report');
    }

    public function target()
    {
        return $this->belongsTo('App\Target');
    }


}
