<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends \Bican\Roles\Models\Permission
{
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }
}
