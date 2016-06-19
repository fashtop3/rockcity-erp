<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

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


    public static function mailExits($email)
    {
        if(!empty(Client::where('email', $email)->get()->toArray())){
            return true;
        }
        return false;
    }

    public function schedules()
    {
        return $this->hasMany('App\Schedule');
    }
}
