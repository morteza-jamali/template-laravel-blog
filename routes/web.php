<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/', PostController::class . '@index')->name('index');
Route::get('/admin', PostController::class . '@admin')->name('admin');
Route::get('/posts/{post}', PostController::class . '@show')->name('show');

Route::post('/admin', PostController::class . '@store')->name('admin.store');
