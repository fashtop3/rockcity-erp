<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DriverReportStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //Todo: protect if user is a driver
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
            'vehicle_id' => 'required|exists:vehicles,id',
//            'info' => 'required|array',
            'info.time_inspect' => 'required|string',
            'info.water_level' => 'required|int',
            'info.oil_level' => 'required|int',
            'info.fuel_level' => 'required|string',
            'info.break_condition' => 'required|string',
            'info.absorber_condition' => 'required|string',
            'info.time_washed' => 'required|string',
            'info.passenger' => 'required|string',
            'info.destination' => 'required|string',
            'info.millage_bl' => 'required|string',
            'info.millage_rt' => 'required|string',
            'info.time_out' => 'required|string',
            'info.time_back' => 'required|string',
            'info.fuel_bl' => 'required|string',
            'info.fuel_bk' => 'required|string',
            'html_text' => 'sometimes|string|nullable'
        ];
    }
}
