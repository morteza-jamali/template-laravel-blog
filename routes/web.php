<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Route::get('/', PostController::class . '@index')->name('index');

// Dashboard routes
Route::get('/dashboard', [PostController::class, 'render'])->name(
  'dashboard.home',
);
Route::get('/dashboard/post/new', [PostController::class, 'render'])->name(
  'dashboard.post.new',
);
Route::get('/dashboard/post/edit/{id}', [
  PostController::class,
  'renderPostEditView',
])->name('dashboard.post.edit');
Route::get('/dashboard/post/all', [PostController::class, 'render'])->name(
  'dashboard.post.all',
);
Route::get('/dashboard/category/new', [PostController::class, 'render'])->name(
  'dashboard.category.new',
);
Route::get('/dashboard/category/edit/{id}', [
  PostController::class,
  'renderPostEditView',
])->name('dashboard.category.edit');
Route::get('/dashboard/category/all', [PostController::class, 'render'])->name(
  'dashboard.category.all',
);

// Route::get('/posts/{p}', PostController::class . '@show')->name('show');

// Route::post('/admin', PostController::class . '@store')->name('admin.store');
