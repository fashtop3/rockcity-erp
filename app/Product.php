<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    /**
     * A product has many sub-product
     * @return mixed
     */
    public function prices() {
        return $this->hasMany('App\Price');
    }
}
