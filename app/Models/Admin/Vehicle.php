<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [ 'user_id', 'name', 'reg', 'eng', 'colour' ];
}
