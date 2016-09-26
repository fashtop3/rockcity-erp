<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promocode extends Model
{
    //

    /**
     * @var bool
     */
    public $timestamps = false;

    protected $dates = ['expiry_date'];

    /**
     * @var array
     */
    protected $fillable = [
        'code',
        'reward',
        'quantity',
        'expiry_date',
    ];
}
