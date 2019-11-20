<?php

namespace App\Http\Controllers\Api;

use App\Repository\Repository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Http\Requests\UserRequest;
class UserController extends BaseController
{
    /*public function __construct(Repository $userRepository){
        //$this->repository = $userRepository;

    }*/
    public function userAdd(UserRequest $request){
        $inputData = $request->all();
    }


}
