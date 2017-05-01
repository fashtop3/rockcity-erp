<?php

namespace App;

use App\Models\Client;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password', 'upload'
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
}
