<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class AllCategoriesController extends Controller
{
  public function render()
  {
    $categories = Category::all()->toArray();

    return Inertia::render('Blog/Category/AllCategories/AllCategories', [
      'categories' => $categories,
      'top_tags' => getTopTags(12),
    ]);
  }
}
