<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('test', 'TestController@index');

Route::group(['prefix'     => 'auth',], function ($router) {
    Route::post('login', 'Api\AuthController@login')->name('user.login');
});

Route::group([
    'middleware' => ['jwt.auth','developer'],
    'prefix'     => 'auth',
], function ($router) {
    Route::patch('update', 'Api\AuthController@update');
    Route::post('register', 'Api\AuthController@register');
    Route::post('logout', 'Api\AuthController@logout');
    Route::post('refresh', 'Api\AuthController@refresh');
    Route::post('me', 'Api\AuthController@me');
    Route::post('user/add', 'Api\UserController@userAdd');
    Route::get('usergrouplist', 'Api\UsergroupController@getUserGroupList');
    Route::get('userlist/{page?}', 'Api\UserController@userList');
    Route::delete('deleteuser/{id}', 'Api\UserController@delete');
    Route::post('addCompany', 'Api\CompanyController@addCompany');

});


