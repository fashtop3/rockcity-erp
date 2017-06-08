<?php

namespace App\Models\Assessment;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class AssessmentConfig extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'enable',
        'starts',
        'ends',
    ];

    protected $dates = ['starts', 'ends', 'deleted_at'];

    public function setStartsAttribute($date)
    {
        $this->attributes['starts'] = Carbon::parse($date);
    }

    public function setEndsAttribute($date)
    {
        $this->attributes['ends'] = Carbon::parse($date);
    }



    public static function checkResetAll($enable)
    {
        if($enable == 1) {
            DB::table('assessment_configs')->update(['enable' => 0]);
        }
    }

    public function assessments()
    {
        return $this->hasMany('App\Models\Assessment\Assessment');
    }


    public function scopeGetActive($query)
    {
        return $query->whereEnable(1)
            ->where('starts', '<=', Carbon::now())
            ->where('ends', '>=', Carbon::now());
    }
}
