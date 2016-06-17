<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Bican\Roles\Models\Role as BRole;

class Role extends BRole
{
    //
//    protected $fillable = [ 'name'];

    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function permissions()
    {
        return $this->belongsToMany('App\Permission')->withTimestamps();
    }
}