<?php


namespace App\Repositories;

use App\Model\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function userAdd($inputData){

       $user =  User::create([
            'name'     => $inputData['name'],
            'email'    => $inputData['email'],
            'password' => bcrypt($inputData['password']),
        ]);

       return $user;
    }

}
