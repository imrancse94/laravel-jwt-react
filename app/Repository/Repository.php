<?php
/**
 * Created by PhpStorm.
 * User: MD Eyasin
 * Date: 7/28/2019
 * Time: 3:37 PM
 */

namespace App\Repository;


use App\Http\Requests\Validator;
use App\Repository\Contract\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as Registry;
use Mockery\Exception;
use App\Http\Controllers\Traits\PermissionUpdateTreait;
abstract class Repository implements RepositoryInterface
{
    use PermissionUpdateTreait;
    private $registry;
    private $model;

    /**
     * Repository constructor.
     * @param Registry $registry
     */
    public function __construct(Registry $registry)
    {
        $this->registry = $registry;
        $this->makeModel();
    }

    public function getCurrentModel(){
        return $this->model;
    }

    public function attach(Validator $request){
            if (!empty($this->model->fillable)) {
                foreach ($this->model->fillable as $field) {
                    if ($request->has($field)) {
                        $this->model->{$field} = trim($request->get($field));
                    }
                }
            }
        return true;
    }

    /**
     * @return mixed
     */
    abstract function model();


    /**
     * @return Model
     */
    private function makeModel(){
        //get Model class form Container
        $this->model = $this->registry->make($this->model());
        if(!$this->model instanceof Model){
            throw new Exception("The {$this->model} not found");
        }
        return $this->model;
    }

    /**
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = array('*')){

        return $this->model->get($columns);
    }

    /**
     * @param int $perPage
     * @param array $columns
     * @return mixed
     */
    public function paginate(int $perPage = 15, array $columns = array('*')){
            return $this->model->paginate($perPage, $columns);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data){
        return $this->model->create($data);
    }

    /**
     * @param array $data
     * @param int $id
     * @param string $attributes
     * @return mixed
     */
    public function update(array $data, int $id, string $attribute = 'id'){
        return $this->model->where($attribute, '=', $id)->update($data);
    }

    public function save(){
        return $this->model->save();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function delete(int $id){
        return $this->model->destory($id);
    }

    /**
     * @param int $id
     * @param array $columns
     * @return mixed
     */
    public function find(int $id, array $columns = array('*')){
        return $this->model->find($id, $columns);
    }

    /**
     * @param $attribute
     * @param $value
     * @param array $columns
     * @return mixed
     */
    public function findBy($attribute, $value, array $columns = array('*')){
        return $this->model->where($attribute, '=', $value)->first($columns);
    }


}
