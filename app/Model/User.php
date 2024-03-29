<?php

namespace App\Model;

use Illuminate\Pagination\Paginator;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','created_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    public function insertUser($inputData){
        $user = new User;
        $user->company_id = $inputData['company_id'];
        $user->name = $inputData['username'];
        $user->email = $inputData['email'];
        $user->password = bcrypt($inputData['password']);
        return $user->save();

    }


    public function getUserList($params = []){
        $page_limit = 3;
        $page_no = 1;
        if(isset($params['page']) && !empty($params['page'])){
            $page_no = $params['page'];
        }

        Paginator::currentPageResolver(function () use ($page_no) {
            return $page_no;
        });
        $users = User::paginate($page_limit);
        return $users;
    }

    public function userDeleteById($id){
      return  User::where('id',$id)->delete();
    }

}
