<?php

namespace App\Repositories\Usergroup;


use Illuminate\Support\ServiceProvider;


class UsergroupRepoServiceProvide extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {

    }


    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Repositories\Usergroup\UsergroupInterface', 'App\Repositories\Usergroup\UserRepo');
    }
}
