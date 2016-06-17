<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordResets extends Model
{
    protected $fillable = ['email', 'token'];

    protected $hidden = ['token'];

//    protected $timestamps  = false;

    public function scopeEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    public function scopeToken($query, $token)
    {
        return $query->where('token',$token);
    }

    public function setUpdatedAtAttribute($value)
    {
        // to Disable updated_at
    }

    public function getUpdatedAtColumn()
    {
        //Do-nothing
    }
}
