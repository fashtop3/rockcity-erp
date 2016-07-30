<?php

namespace App\Http\Controllers;

use App\Role;
use Bican\Roles\Models\Permission;
use Illuminate\Http\Request;

use App\Http\Requests;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.basic', [ 'except' => ['index'] ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all();

        $roles->each(function($item) {
            $item->permissions->lists('slug');
        });

        if($roles) {
            return response($roles);
        }

        return response('No roles found', 403);
    }

}
