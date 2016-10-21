<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubscriptionAttachment extends Model
{
    protected $fillable = [ 'schedule', 'schedule_product_sub', 'filename', 'filesize', 'filetype'];
}
