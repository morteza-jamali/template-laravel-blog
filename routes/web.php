<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Route::get('/', PostController::class . '@index')->name('index');
Route::get('/dashboard/post/new', [PostController::class, 'render'])->name(
  'dashboard.post.new',
);
Route::get('/dashboard', [PostController::class, 'render'])->name(
  'dashboard.home',
);

// Route::get('/posts/{p}', PostController::class . '@show')->name('show');

// Route::post('/admin', PostController::class . '@store')->name('admin.store');
