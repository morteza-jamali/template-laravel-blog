<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

// Dashboard routes
Route::get('/dashboard', [CategoryController::class, 'render'])->name(
  'dashboard.home',
);

// Dashboard/Post routes
Route::get('/dashboard/post/new', [CategoryController::class, 'render'])->name(
  'dashboard.post.new',
);
Route::get('/dashboard/post/edit/{id}', [
  CategoryController::class,
  'render',
])->name('dashboard.post.edit');
Route::get('/dashboard/post/all', [CategoryController::class, 'render'])->name(
  'dashboard.post.all',
);

// Dashboard/Category routes
Route::get('/dashboard/category/new', [
  CategoryController::class,
  'renderNewCategory',
])->name('dashboard.category.new');
Route::post('/dashboard/category/new', [
  CategoryController::class,
  'addCategory',
])->name('dashboard.category.new.add');
Route::get('/dashboard/category/edit/{id}', [
  CategoryController::class,
  'renderEditCategory',
])->name('dashboard.category.edit');
Route::patch('/dashboard/category/edit/{id}', [
  CategoryController::class,
  'editCategory',
])->name('dashboard.category.edit.patch');
Route::delete('/dashboard/category/all', [
  CategoryController::class,
  'deleteCategory',
])->name('dashboard.category.all.delete');
Route::get('/dashboard/category/all', [
  CategoryController::class,
  'renderAllCategory',
])->name('dashboard.category.all');

// Dashboard/Tags routes
Route::get('/dashboard/tag/new', [CategoryController::class, 'render'])->name(
  'dashboard.tag.new',
);
Route::get('/dashboard/tag/edit/{id}', [
  CategoryController::class,
  'render',
])->name('dashboard.tag.edit');
Route::get('/dashboard/tag/all', [CategoryController::class, 'render'])->name(
  'dashboard.tag.all',
);
