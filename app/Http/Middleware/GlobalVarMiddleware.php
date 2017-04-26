<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class GlobalVarMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $contacts = [
            ['name'=>'Admin', 'email'=> User::Contact_Admin ],
            ['name'=>'Executive Director', 'email'=> User::Contact_ED ],
            ['name'=>'Account', 'email'=> User::Contact_Account ],
            ['name'=>'Support', 'email'=> User::Contact_Support ],
            ['name'=>'Traffic', 'email'=> User::Contact_Traffic ],
            ['name'=>'Marketing', 'email'=> User::Contact_Marketing ],
        ];


        view()->share('user', @auth()->user());
        view()->share('contacts', $contacts);
        return $next($request);
    }
}
