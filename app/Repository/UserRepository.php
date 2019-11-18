<?php

namespace App\Repository;


class UserRepository extends Repository
{

    /**
     * @return mixed
     */
    public function model()
    {
        return "App\Model\User";
    }

    public function setPermissionByUserId($user_id){
        return $this->getPermissionList($user_id);
    }
}
