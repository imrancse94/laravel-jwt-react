<?php


namespace App\Repositories;

use App\Model\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Http\Controllers\Traits\PermissionUpdateTreait;
class Repository implements UserRepositoryInterface
{
    use PermissionUpdateTreait;

    public function userAdd($inputData){

       $user =  User::create([
            'name'     => $inputData['name'],
            'email'    => $inputData['email'],
            'password' => bcrypt($inputData['password']),
        ]);

       return $user;
    }


    public function setPermissionByUserId($user_id){
       return $this->getPermissionList($user_id);
    }

    public function getUsergroupListByUserId($id)
    {

    }
}
