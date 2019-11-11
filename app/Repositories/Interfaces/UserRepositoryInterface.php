<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{

    public function userAdd($inputData);

    public function getUsergroupListByUserId($id);

}
