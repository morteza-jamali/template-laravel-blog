<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

// Route::get('/', DashboardController::class . '@index')->name('index');

// Dashboard routes
Route::get('/dashboard', [DashboardController::class, 'render'])->name(
  'dashboard.home',
);

// Dashboard/Post routes
Route::get('/dashboard/post/new', [DashboardController::class, 'render'])->name(
  'dashboard.post.new',
);
Route::get('/dashboard/post/edit/{id}', [
  DashboardController::class,
  'render',
])->name('dashboard.post.edit');
Route::get('/dashboard/post/all', [DashboardController::class, 'render'])->name(
  'dashboard.post.all',
);

// Dashboard/Category routes
Route::get('/dashboard/category/new', [
  DashboardController::class,
  'renderNewCategory',
])->name('dashboard.category.new');
Route::post('/dashboard/category/new', [
  DashboardController::class,
  'addCategory',
])->name('dashboard.category.new.add');
Route::get('/dashboard/category/edit/{id}', [
  DashboardController::class,
  'render',
])->name('dashboard.category.edit');
Route::delete('/dashboard/category/all/{id}', [
  DashboardController::class,
  'deleteCategory',
])->name('dashboard.category.all.delete');
Route::get('/dashboard/category/all', [
  DashboardController::class,
  'renderAllCategory',
])->name('dashboard.category.all');

// Dashboard/Tags routes
Route::get('/dashboard/tag/new', [DashboardController::class, 'render'])->name(
  'dashboard.tag.new',
);
Route::get('/dashboard/tag/edit/{id}', [
  DashboardController::class,
  'render',
])->name('dashboard.tag.edit');
Route::get('/dashboard/tag/all', [DashboardController::class, 'render'])->name(
  'dashboard.tag.all',
);

// Route::get('/posts/{p}', DashboardController::class . '@show')->name('show');

// Route::post('/admin', DashboardController::class . '@store')->name('admin.store');
