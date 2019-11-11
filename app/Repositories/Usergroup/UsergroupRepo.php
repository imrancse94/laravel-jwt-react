<?php

namespace App\Repositories\Usergroup;


use App\Repositories\Usergroup\UsergroupInterface as UsergroupInterface;
use App\Models\Usergroup;


class UsergroupRepo implements UsergroupInterface
{
    public $usergroup;


    function __construct(Usergroup $user) {
        $this->usergroup = $user;
    }


    public function getAll()
    {
        return $this->usergroup->getAll();
    }


    public function find($id)
    {
        return $this->usergroup->findUser($id);
    }


    public function delete($id)
    {
        return $this->usergroup->deleteUser($id);
    }
}
