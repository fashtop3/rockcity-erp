<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportVehicle extends Model
{

    protected $fillable = ['report_id', 'vehicle_id', 'driver', 'passenger', 'destination', 'millageBefore', 'millageAfter',
        'timeBefore', 'timeAfter', 'fuelBefore', 'fuelAfter', 'htmlText'
    ];

    public function report()
    {
        return $this->belongsTo('App\Report');
    }

    public function vehicle()
    {
        return $this->belongsTo('App\Vehicle');
    }
}
