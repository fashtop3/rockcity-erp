<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [ 'user_id', 'name', 'reg', 'eng', 'colour' ];

    public function scopeReg($query, $regNo)
    {
        return $query->where('reg', $regNo)->get();
    }

    public function scopeEng($query, $engNo)
    {
        return $query->where('eng', $engNo)->get();
    }

}
