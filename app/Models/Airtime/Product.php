<?php

namespace App\Models\Airtime;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public function prices() {
        return $this->hasMany('App\Models\Airtime\Price');
    }
}
