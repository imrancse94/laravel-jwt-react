<?php
namespace App\Http\Controllers\Traits;

trait OTPTrait{
 public function sendSMS($header, $message, $phones){ 
      
        $username = "902127060595";//config('app.nexmo_api_key');
        $password = "Server!!!";//config('app.nexmo_api_secret');
         
        $sms_msg = array(
            "username" => $username, // https://oim.verimor.com.tr/sms_settings/edit adresinden öğrenebilirsiniz.
            "password" => $password, // https://oim.verimor.com.tr/sms_settings/edit adresinden belirlemeniz gerekir.
            "source_addr" => $header, // Gönderici başlığı, https://oim.verimor.com.tr/headers adresinde onaylanmış olmalı, değilse 400 hatası alırsınız.
            "custom_id" => "1424441160.9331344",
            "messages" => array(
                array(
                    "msg" => $message,
                    "dest" => $phones
                )
            )
        );

    $ch = curl_init('http://sms.verimor.com.tr/v2/send.json');
    curl_setopt_array($ch, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
        CURLOPT_POSTFIELDS => json_encode($sms_msg),
    ));
    $http_response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if($http_code != 200){
        echo "$http_code $http_response\n";
        return false;
    }
    return $http_response;
}

public function cacheTheOTP()
    {
        $OTP = rand(100000, 999999);
        
        return $OTP;
    }

}