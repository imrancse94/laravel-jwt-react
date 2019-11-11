<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Usergroup\UsergroupInterface as UsergroupInterface;

class UsergroupController extends BaseController
{
    function __construct(UsergroupInterface $usergroup)
    {
        $this->usergroup = $usergroup;
    }

    public function getUserGroupList(){
       $usergroupList =  $this->usergroup->getAll();
       dd($usergroupList);
    }
}
