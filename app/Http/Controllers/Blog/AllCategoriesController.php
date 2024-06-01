<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllCategoriesController extends Controller
{
  public function render()
  {
    return Inertia::render('Blog/Category/AllCategories');
  }
}
