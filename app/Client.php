<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'street_no',
        'street_name',
        'town',
        'title',
        'firstname',
        'lastname',
        'mobile',
        'email'
    ];

    protected $dates = ['deleted_at'];


    public static function mailExits($email)
    {
        if(!empty(Client::withTrashed()->where('email', $email)->get()->first())){
            return true;
        }
        return false;
    }

    public function schedules()
    {
        return $this->hasMany('App\Schedule');
    }
}
