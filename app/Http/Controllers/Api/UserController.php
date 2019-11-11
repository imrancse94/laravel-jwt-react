<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class UserController extends BaseController
{
    public function userAdd(Request $request){
        $validator = Validator::make($request->all(),[
            'name'   => 'required',
            'email'=> 'required',
            'password'=> 'required',
            'password_confirmation'=> 'required|same:password',
            'language'=> 'required',
            'usergroup_id'=> 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('User register Error',$validator->messages(),102);
        }
    }


}
