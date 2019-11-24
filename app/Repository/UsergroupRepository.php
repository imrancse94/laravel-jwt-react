<?php

namespace App\Repository;

use Illuminate\Container\Container as Registry;

class UsergroupRepository extends Repository
{
    private $_methods = array();

    public function __construct(Registry $registry)
    {
        parent::__construct($registry);
    }

    /**
     * @return mixed
     */
    public function model()
    {
        return "App\Models\Usergroup";
    }


    public function getUserGroupList(){
        $usergroupList = [];
        $usergroups = $this->all(['id','name']);
        if(!$usergroups->isEmpty()){
            foreach ($usergroups as $usergroup){
                $usergroupList[] = ['id'=>$usergroup->id,'name'=>$usergroup->name];
            }
        }

        return $usergroupList;
    }

}
