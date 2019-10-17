<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Validator;
use Session;
use App\Repositories\Repository;


class AuthController extends BaseController
{
    private $repository;

    public function __construct(Repository $userRepository){
        $this->repository = $userRepository;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function me()
    {

        $data['user'] = auth()->user();
        $data['permission']['routelist'] = session('permittedRouteNames');
        $data['permission']['modulelist'] = session('modules');
        $data['permission']['permissions'] = session('user_permission');
        return $this->sendResponse($data,'Sucessfully logged in');
    }


    public function logout()
    {
        auth()->logout();

        return $this->sendResponse([],'Sucessfully logged out');
    }

    public function login(Request $request){


        $validator = Validator::make($request->all(),[
            'email'   => 'required',
            'password'=> 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Login Error',$validator->messages(),102);
        }

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return $this->sendError('Invalid username or password',[],103);
        }

        $data = $this->respondWithToken($token);
        $data['permission'] = $this->repository->setPermissionByUserId(auth()->user()->id);
       return $this->sendResponse($data,'Successfully logged in');

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
