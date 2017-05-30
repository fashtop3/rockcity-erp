<?php

namespace App;

use App\Models\Client;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Bican\Roles\Traits\HasRoleAndPermission;
use Bican\Roles\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;

class User extends Authenticatable implements HasRoleAndPermissionContract
{
    use Notifiable, HasRoleAndPermission, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password', 'upload', 'status'
    ];

    const Contact_Developer = 'fashtop3@gmail.com';
    const Contact_Admin = 'niran.malaolu@rockcityfmradio.com';
    const Contact_ED = 'bukky.malaolu@rockcityfmradio.com';
    const Contact_Account = 'yinka.adelowo@rockcityfmradio.com';
    const Contact_Support = 'mpo@rockcityfmradio.com';
    const Contact_Traffic = 'wale.ogunbiyi@rockcityfmradio.com';
    const Contact_Marketing = 'olufunso.adeniran@rockcityfmradio.com';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public static function marketers()
    {
        $role = \App\Role::where('name', 'marketing')->get()->first();

        return $role->users;
    }

    /**
     * Relationship build
     * a user belongsTo or say a user is having many roles in english terms
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role')->withTimestamps();
    }

    /**
     * Relationship build
     * a user belongsTo or say a user is having many permissions in english terms
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany('App\Permission')->withTimestamps();
    }


    /**
     * returns all airtime generated buy the user
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedules()
    {
        return $this->hasMany('App\Models\Airtime\Schedule');
    }

    public function vehicles(){
        return $this->hasMany('App\Models\Admin\Vehicle');
    }

    public function targets(){
        return $this->hasMany('App\Models\Admin\Target');
    }

    public function myTargets(){
        return $this->hasMany('App\Models\Admin\Target', 'marketer');
    }

    public function reports(){
        return $this->hasMany('App\Models\Report\Report');
    }
}
