<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffReportStoreRequest extends FormRequest
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
            'challenge' => 'required|string',
            'task' => 'required|string',
            'completed' => 'required_with:taskHtmlText|boolean',
            'grade' => 'required_with:taskHtmlText|alpha|size:1',
        ];
    }
}
