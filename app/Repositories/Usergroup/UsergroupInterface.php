<?php
namespace App\Repositories\Usergroup;

interface UsergroupInterface {


    public function getAll();


    public function find($id);


    public function delete($id);
}
