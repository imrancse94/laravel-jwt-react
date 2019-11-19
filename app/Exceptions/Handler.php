<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Http\Controllers\Traits\ApiResponseTrait;
class Handler extends ExceptionHandler
{
    use ApiResponseTrait;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof UnauthorizedHttpException) {
            $message = "Unauthentication";

            $preException = $exception->getPrevious();
            if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                $message = 'TOKEN_EXPIRED';
            } else if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                $message = 'TOKEN_INVALID';
            } else if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException) {
                $message = 'TOKEN_BLACKLISTED';
            }

            if ($exception->getMessage() === 'Token not provided') {
                $message = 'Token not provided';
            }

            return $this->sendApiResponse(false, $message, [], config('apiconstants.API_TOKEN_VALIDATION'));
        }

        return parent::render($request, $exception);
    }
}
