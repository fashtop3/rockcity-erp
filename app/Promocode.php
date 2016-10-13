<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Trexology\Promocodes\Model\Promocodes;

class Promocode extends Promocodes
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
