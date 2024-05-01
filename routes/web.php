<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Route::get('/', PostController::class . '@index')->name('index');
Route::inertia('/dashboard/post/new', 'Dashboard/Post/New');
// Route::get('/posts/{p}', PostController::class . '@show')->name('show');

// Route::post('/admin', PostController::class . '@store')->name('admin.store');
