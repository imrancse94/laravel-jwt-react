<?php

namespace App\Repository;


use App\Models\Company;

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

    public function addNewUser($inputData){
      return $this->getCurrentModel()->insertUser($inputData);
    }

    public function getUserList($inputData){
        return $this->getCurrentModel()->getUserList($inputData);
    }

    public function userDeleteById($id){
      return  $this->getCurrentModel()->userDeleteById($id);
    }

    public function processCompanyAdd($inputData){
           $companyObj = new Company();
           $company = $companyObj->add($inputData);
           $inputData['username'] = $inputData['name'];
           $inputData['company_id'] = $company->id;
           $this->addNewUser($inputData);
    }
}
