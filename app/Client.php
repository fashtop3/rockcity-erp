<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'address',
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
