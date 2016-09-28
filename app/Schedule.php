<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Schedule extends Model
{
    protected $fillable = [
        'user_id',
        'client_id',
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
        return $query->where('user_id', Auth::user()->id);
    }

    public function setPromocodeAttribute($promocode) {
        $this->attributes['promocode'] = serialize($promocode);
    }

    public function getPromocodeAttribute($promocode) {
        return unserialize($promocode);
    }

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->toAtomString();
    }

    public static function setOrderNo(Schedule &$schedule)
    {
        $month = Carbon::now()->format('n');
        $schedule['order_no'] = self::$prefix[$month] . str_pad($schedule->id, 10, '0', STR_PAD_LEFT);
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
        return $this->belongsTo('App\Client')->withTrashed();
    }

    public function scheduleAlert()
    {
        return $this->hasOne('App\ScheduleAlert');
    }

    public function schProducts()
    {
        return $this->hasMany('App\ScheduleProduct');
    }
}