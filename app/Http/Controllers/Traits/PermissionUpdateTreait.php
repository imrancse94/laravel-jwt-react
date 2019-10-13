<?php

namespace App\Http\Controllers\Traits;

use DB;
use App\Models\Module;
use Session;
use Config;
use Illuminate\Support\Facades\Route;
trait PermissionUpdateTreait
{
    public function getPermissionList($user_id)
    {
        $SUPER_SUPER_ADMIN_ID = Config::get('constants.defines.SSADMIN_ID');
        $sql = 'SELECT  users.id AS user_id,users.permission_version,pages.id AS page_id, pages.name AS page_name, 
                                 modules.id AS module_id,submodules.controller_name,submodules.name AS submodule_name, submodules.id
                                 AS submodule_id,pages.route_name,submodules.default_method  FROM users
					INNER JOIN user_usergroups ON users.id = user_usergroups.user_id
					INNER JOIN usergroups ON user_usergroups.usergroup_id = usergroups.id
					INNER JOIN usergroup_roles ON usergroups.id = usergroup_roles.usergroup_id
					INNER JOIN roles ON usergroup_roles.role_id = roles.id
					INNER JOIN role_pages ON roles.id = role_pages.role_id
					INNER JOIN pages ON role_pages.page_id = pages.id
					INNER JOIN submodules ON pages.submodule_id = submodules.id
					INNER JOIN modules ON submodules.module_id = modules.id
					WHERE  users.id = ' . $user_id;

        $permissions = DB::select($sql);
        if (!empty($permissions)) {
            $modules = Module::with('submodules', 'submodules.pages')->get();
            Session::put('modules', $modules);
            Session::put('user_permission', $permissions);
            $permittedRouteName = $this->getPermittedPageRouteName($permissions);
            Session::put('permittedRouteNames', $permittedRouteName);
            Session::put('permission_version', $permissions[0]->permission_version);
        }

        dd($permittedRouteName);
        return $permissions;

    }

    private function getPermittedPageRouteName($permissions)
    {
        $permittedRouteName = [];
        foreach ($permissions as $key => $permission) {
            $permittedRouteName[$key] =  strtolower($permission->route_name);
        }
        return $permittedRouteName;
    }


    public function getSubModules($request_controller)
    {


        if ($request_controller == "dashboard") {
            return array();
        }
        $current_submodule_arr = array();
        $modules = Session::get('modules');
        if (!empty($modules)) {
            foreach ($modules as $module) {
                foreach ($module->submodules as $submodule) {

                    $submodule['controller_name'] = trim($submodule['controller_name']);
                    //echo $request_controller."=====".$submodule['controller_name']."<br/>";
                    if (strtolower($request_controller) == strtolower($submodule['controller_name'])) {
                        //echo "Sds";exit;
                        $current_submodule_arr = array($submodule['name'] => $submodule['id']);
                        break 2;
                    }
                }//exit;
            }
        }
        return $current_submodule_arr;
    }


    public function getPages($request_controller)
    {

        if ($request_controller == "dashboard") {
            return array();
        }
        $pages_arr = array();
        $current_submodule_arr = $this->getSubModules($request_controller);

        $modules = Session::get('modules');

        if (!empty($modules)) {
            foreach ($modules as $module) {
                foreach ($module->submodules as $submodule) {
                    if (current($current_submodule_arr) == $submodule['id']) {
                        foreach ($submodule['pages'] as $page) {
                            $pages_arr[$page['route_name']] = $page['id'];

                        }
                        break 2;
                    }
                }
            }
        }
        return $pages_arr;
    }

}
