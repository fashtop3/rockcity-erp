<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ProductTime extends Model
{

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
