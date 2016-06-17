<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $fillable = [
        'user_id',
        'filename',
        'thumbnail'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
