<?php

namespace App\Models\Airtime;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'user_id',
        'client_id',
        'marketer_id',
        'order_no',
        'promocode',
        'discount',
        'discountAmt',
        'commission',
        'commissionAmt',
        'subTotal',
        'grandTotal'
    ];

    protected static $prefix = [
        1 => 'JA', 2 => 'FE', 3 => 'MA', 4 => 'AP', 5 => 'MY', 6 => 'JN',
        7 => 'JY', 8 => 'AG', 9 => 'SE', 10 => 'OC', 11 => 'NV', 12 => 'DC'
    ];

    public $bg_colour;


    public function scopeSearch($query, $min, $max)
    {
        return $query->whereBetween('created_at', [$min , $max]);
    }

    public function scopeCurrentUser($query)
    {
        return $query->where('user_id', auth()->user()->id);
    }

    public function setPromocodeAttribute($promocode) {
        $this->attributes['promocode'] = serialize($promocode);
    }

    public function getPromocodeAttribute($promocode) {
        return unserialize($promocode);
    }

    public function setOrderNo()
    {
        $month = Carbon::now()->format('n');
        $this->update(['order_no' => static::$prefix[$month] . str_pad($this->id, 10, '0', STR_PAD_LEFT)]);
    }

//    public function subscriptions()
//    {
//        return $this->hasMany('App\ScheduleSub');
//    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function client()
    {
        return $this->belongsTo('App\Models\Client')->withTrashed();
    }

    public function alert()
    {
        return $this->hasOne('App\Models\Airtime\ScheduleAlert');
    }
//
    public function products()
    {
        return $this->hasMany('App\Models\Airtime\ScheduleProduct');
    }
}
