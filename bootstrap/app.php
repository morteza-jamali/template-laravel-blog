<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
  ->withCommands([__DIR__ . '/../app/Console/Commands/Fake'])
  ->withRouting(
    web: __DIR__ . '/../routes/web.php',
    commands: __DIR__ . '/../routes/console.php',
    health: '/up',
  )
  ->withMiddleware(function (Middleware $middleware) {
    $middleware->web(
      append: [
        HandleInertiaRequests::class,
        AddLinkHeadersForPreloadedAssets::class,
      ],
    );
  })
  ->withExceptions(function (Exceptions $exceptions) {
    //
  })
  ->create();
