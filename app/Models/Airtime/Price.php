<?php

namespace App\Models\Airtime;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{

    protected $fillable = [
        'product_id',
        'duration',
        'amount',
        'rate'
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Airtime\Product');
    }
}
