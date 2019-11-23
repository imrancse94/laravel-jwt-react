<?php

namespace App\Http\Controllers\Api;

use App\Repository\Repository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Http\Requests\UserRequest;
use DB;
class UserController extends BaseController
{
    public function __construct(Repository $userRepository){
        $this->repository = $userRepository;

    }
    public function userAdd(UserRequest $request){
        $inputData = $request->all();
        $inputData['company_id'] = 2;
        $status_code = config('apiconstants.API_USER_ADD_FAILED');
        $description = "Not inserted";
        $status = false;
        $data = [];
        DB::beginTransaction();
        try {
            $data = $this->repository->addNewUser($inputData);
            if (!empty($data)) {
                $status = true;
                $description = "Successfully inserted";
                $status_code = config('apiconstants.API_USER_ADD_SUCCESS');
            }
            DB::commit();
        }catch (\Exception $e){
            $description = $e->getMessage();
            DB::rollback();
        }

        $response = $this->sendApiResponse($status, $description , $data, $status_code);
        return $response;
    }

    public function userList(){
        $status_code = config('apiconstants.API_USER_LIST_FAILED');
        $description = "No data found";
        $status = false;
        $data = $this->repository->getUserList();
        if(!empty($data)){
            $description = "user list";
            $status = true;
            $status_code = config('apiconstants.API_SUCCESS');
        }
        $response = $this->sendApiResponse($status, $description , $data, $status_code);
        return $response;
    }


}
