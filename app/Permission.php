<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Bican\Roles\Models\Permission as BPermission;

class Permission extends BPermission
{

    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function roles()
    {
        return $this->belongsToMany('App\Role')->withTimestamps();
    }
}
