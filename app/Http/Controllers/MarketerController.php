<?php

namespace App\Http\Controllers;

use App\Marketer;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class MarketerController extends Controller
{
    public function index() {
        $maketers = Marketer::all();
        $profiles = [];


        if($maketers) {
            foreach($maketers as $maketer) {
                $profiles[] = $maketer->user;
            }
        }

        if(!empty($profiles)) {
            return response($profiles);
        }

        return response('No result found', 403);
    }
}
