<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\ApiResponseTrait;
use App\Http\Controllers\Traits\FileUploadTrait;
class BaseController extends Controller
{
    use ApiResponseTrait,FileUploadTrait;


}
