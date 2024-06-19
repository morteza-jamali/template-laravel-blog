<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\Blog\HomeController;
use App\Http\Controllers\Blog\SinglePostController;
use App\Http\Controllers\Blog\SingleCategoryController;
use App\Http\Controllers\Blog\AllCategoriesController;
use App\Http\Controllers\Blog\SingleTagController;
use App\Http\Controllers\Blog\AllTagsController;
use App\Http\Controllers\Blog\AllPostsController;

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
Route::get('/dashboard/tag/new', [TagController::class, 'renderNewTag'])->name(
  'dashboard.tag.new',
);
Route::post('/dashboard/tag/new', [TagController::class, 'addTag'])->name(
  'dashboard.tag.new.add',
);
Route::delete('/dashboard/tag/all', [TagController::class, 'deleteTag'])->name(
  'dashboard.tag.all.delete',
);
Route::get('/dashboard/tag/all', [TagController::class, 'renderAllTag'])->name(
  'dashboard.tag.all',
);
Route::get('/dashboard/tag/edit/{id}', [
  TagController::class,
  'renderEditTag',
])->name('dashboard.tag.edit');
Route::patch('/dashboard/tag/edit/{id}', [
  TagController::class,
  'editTag',
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
