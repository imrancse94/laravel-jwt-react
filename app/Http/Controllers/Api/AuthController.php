<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Validator;
use App\Http\Requests\Login;
use Session;
use App\Repository\Repository;
use App\Http\Controllers\Traits\ApiResponseTrait;

class AuthController extends BaseController
{
    use ApiResponseTrait;
    private $repository;

    public function __construct(Repository $userRepository){
        $this->repository = $userRepository;
        //$this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function me()
    {
        $data['user'] = auth()->user();
        $data['permission'] = $this->repository->setPermissionByUserId(auth()->user()->id);
        return $this->sendApiResponse(true,'Sucessfully logged in',$data,config('apiconstants.API_LOGIN_SUCCESS'));
    }


    public function logout()
    {
        auth()->logout();
        return $this->sendApiResponse(true,'Sucessfully logged out',[],config('apiconstants.API_LOGIN_SUCCESS'));
    }

    public function login(Login $request){

        $credentials = request(['email', 'password']);
        $status = false;
        if ($token = auth()->attempt($credentials)) {
            $data = $this->respondWithToken($token);
            $data['permission'] = $this->repository->setPermissionByUserId(auth()->user()->id);
            $status = true;
        }
        return $this->sendApiResponse($status,'Sucessfully logged in',$data,config('apiconstants.API_LOGIN_SUCCESS'));

    }

    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name'    => 'required',
            'email'   => 'required|email',
            'password'=> 'required|min:6',
            'confirm_password'=>'required|same:password'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Registration Error',$validator->messages(),101);
        }

        $inputData['name'] = request('name');
        $inputData['email'] = request('email');
        $inputData['password'] = request('password');
        $inserted = $this->userRepository->userAdd($inputData);

        if(!empty($inserted)){
            return $this->sendResponse($inserted,"Sucessfully inserted");
        }

    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         => auth()->user(),
        ];
    }


    public function refresh()
    {
        return $this->sendResponse($this->respondWithToken(auth()->refresh()),"Successfully refreshed token");
    }

}
