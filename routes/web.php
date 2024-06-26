<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\AllCategoriesController as DAllCategoriesController;
use App\Http\Controllers\Dashboard\EditCategoryController;
use App\Http\Controllers\Dashboard\NewCategoryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\NewTagController;
use App\Http\Controllers\Dashboard\EditTagController;
use App\Http\Controllers\Dashboard\AllTagsController as DAllTagsController;
use App\Http\Controllers\Blog\HomeController;
use App\Http\Controllers\Blog\SinglePostController;
use App\Http\Controllers\Blog\SingleCategoryController;
use App\Http\Controllers\Blog\AllCategoriesController;
use App\Http\Controllers\Blog\SingleTagController;
use App\Http\Controllers\Blog\AllTagsController;
use App\Http\Controllers\Blog\AllPostsController;

// Dashboard routes
Route::get('/dashboard', [DashboardController::class, 'render'])->name(
  'dashboard.home',
);

// Dashboard/Post routes
// Route::get('/dashboard/post/new', [CategoryController::class, 'render'])->name(
//   'dashboard.post.new',
// );
// Route::get('/dashboard/post/edit/{id}', [
//   CategoryController::class,
//   'render',
// ])->name('dashboard.post.edit');
// Route::get('/dashboard/post/all', [CategoryController::class, 'render'])->name(
//   'dashboard.post.all',
// );

// Dashboard/Category routes
Route::get('/dashboard/category/new', [
  NewCategoryController::class,
  'get',
])->name('dashboard.category.new');
Route::post('/dashboard/category/new', [
  NewCategoryController::class,
  'post',
])->name('dashboard.category.new.post');

Route::get('/dashboard/category/edit/{id}', [
  EditCategoryController::class,
  'get',
])->name('dashboard.category.edit');
Route::patch('/dashboard/category/edit/{id}', [
  EditCategoryController::class,
  'patch',
])->name('dashboard.category.edit.patch');

Route::delete('/dashboard/category/all', [
  DAllCategoriesController::class,
  'delete',
])->name('dashboard.category.all.delete');
Route::get('/dashboard/category/all', [
  DAllCategoriesController::class,
  'get',
])->name('dashboard.category.all');

// Dashboard/Tags routes
Route::get('/dashboard/tag/new', [NewTagController::class, 'get'])->name(
  'dashboard.tag.new',
);
Route::post('/dashboard/tag/new', [NewTagController::class, 'post'])->name(
  'dashboard.tag.new.post',
);

Route::get('/dashboard/tag/all', [DAllTagsController::class, 'get'])->name(
  'dashboard.tag.all',
);
Route::delete('/dashboard/tag/all', [
  DAllTagsController::class,
  'delete',
])->name('dashboard.tag.all.delete');

Route::get('/dashboard/tag/edit/{id}', [EditTagController::class, 'get'])->name(
  'dashboard.tag.edit',
);
Route::patch('/dashboard/tag/edit/{id}', [
  EditTagController::class,
  'patch',
])->name('dashboard.tag.edit.patch');

// Blog routes
// Home Page
Route::get('/', [HomeController::class, 'render'])->name('blog.home');

// Single Post Page
Route::get('/post/{id}', [SinglePostController::class, 'render'])->name(
  'blog.post.singlepost',
);

// All Posts Page
Route::get('/posts', [AllPostsController::class, 'render'])->name(
  'blog.post.allposts',
);

// Single Category Page
Route::get('/category/{id}', [SingleCategoryController::class, 'render'])->name(
  'blog.category.singlecategory',
);

// All Categories page
Route::get('/categories', [AllCategoriesController::class, 'render'])->name(
  'blog.category.allcategories',
);

// Single Tag Page
Route::get('/tag/{id}', [SingleTagController::class, 'render'])->name(
  'blog.tag.singletag',
);

// All Tags page
Route::get('/tags', [AllTagsController::class, 'render'])->name(
  'blog.tag.alltags',
);
