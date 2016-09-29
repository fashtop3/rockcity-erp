<?php

namespace App\Exceptions;

use Exception;
use HttpResponseException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if($e instanceof NotFoundHttpException) {
            return response('Route not found. Contact site administrator', 404);
        }

        if($e instanceof MethodNotAllowedHttpException) {
            if ($request->ajax()) {
                return response('Method not allowed contact site Administrator', 405);
            }
            // normal 404 view page feedback
//            return response()->view('errors.missing', [], 404);
        }

//        if ($e instanceof HttpResponseException) {
//            return $e->getResponse();
//        } elseif ($e instanceof ModelNotFoundException) {
//            $e = new NotFoundHttpException($e->getMessage(), $e);
//        } elseif ($e instanceof AuthenticationException) {
//            return $this->unauthenticated($request, $e);
//        } elseif ($e instanceof AuthorizationException) {
//            $e = new HttpException(403, $e->getMessage());
//        } elseif ($e instanceof ValidationException && $e->getResponse()) {
//            return $e->getResponse();
//        }

        return parent::render($request, $e);
    }
}
