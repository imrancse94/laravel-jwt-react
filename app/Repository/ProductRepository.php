<?php
/**
 * Created by PhpStorm.
 * User: MD Eyasin
 * Date: 7/28/2019
 * Time: 4:19 PM
 */

namespace App\Repository;


class ProductRepository extends Repository
{

    /**
     * @return mixed
     */
    function model()
    {
        return "App\Model\Product";
    }
}
