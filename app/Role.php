<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends \Bican\Roles\Models\Role
{
    //

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class)->withTimestamps();
    }
}
