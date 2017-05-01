<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
            'street_no' => 'required|string',
            'street_name' => 'required|string',
            'town' => 'required|string',
            'title' => 'required|alpha|min:2,max:6',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'mobile' => 'required|numeric',
            'email' => 'sometimes|email|nullable',
        ];
    }
}
