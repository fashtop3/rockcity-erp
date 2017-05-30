<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUserUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //Todo: implement a view for unauthorized access
        return auth()->user()->canRegisterStaff();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:users',
            'new_password' => 'sometimes|confirmed|nullable|string|between:6,16',
        ];
    }
}
