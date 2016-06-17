<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class ClientRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'address'  => 'required|string',
            'title'  => 'required|string',
            'firstname' => 'required|string',
            'lastname'  => 'required|string',
            'mobile' => 'required|min:11',
            'email' => 'required|email',
        ];
    }
}
