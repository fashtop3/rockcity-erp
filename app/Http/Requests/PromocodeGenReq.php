<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class PromocodeGenReq extends Request
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
            'type'=>'required|string',
            'reward'=>'required|integer|min:1|max:100',
            'expiry_date'=>'date',
            'quantity' => 'required|integer|max:5',
            'amount'=> 'required|integer|max:50'
        ];
    }
}
