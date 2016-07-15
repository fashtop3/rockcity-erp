<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [ 'user_id' ];


    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function challenges()
    {
        return $this->hasMany('App\Challenge');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }

    public function remittances()
    {
        return $this->hasMany('App\Remittance');
    }

    public function uploads()
    {
        return $this->hasMany('App\ReportUpload');
    }
}
