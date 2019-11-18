<?php
namespace App\Http\Controllers\Traits;

trait ApiResponseTrait
{
    public function sendApiResponse($status,$description, $data = [], $statusCode) {

        $response = [
            'success'=>$status,
            'statuscode' => $statusCode,
            'description' => $description,
            'data'=>$data
        ];


        return response()->json($response, 200);
    }



}
