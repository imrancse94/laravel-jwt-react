<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Companyaddrequest extends Base
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
            'name'=>'required',
            'email'=>'required|email|unique:users|unique:companies',
            'password'=> 'required',
            'password_confirmation'=> 'required|same:password',
            'language'=> 'required',
        ];
    }
}
