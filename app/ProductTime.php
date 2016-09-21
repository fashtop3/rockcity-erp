<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ProductTime extends Model
{
    protected $dates = [ 'premium_start', 'premium_end', 'regular_start','regular_end' ];

    public function getPremiumStartAttribute($time) {
        return Carbon::parse($time)->toDateTimeString();
    }

    public function getPremiumEndAttribute($time) {
        return Carbon::parse($time)->toDateTimeString();
    }

    public function getRegularStartAttribute($time) {
        return Carbon::parse($time)->toDateTimeString();
    }

    public function getRegularEndAttribute($time) {
        return Carbon::parse($time)->toDateTimeString();
    }
}
