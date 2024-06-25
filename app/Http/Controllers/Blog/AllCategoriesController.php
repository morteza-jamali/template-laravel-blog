<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;

class AllCategoriesController extends Controller
{
  public function render(Category $category, Tag $tag)
  {
    $categories = $category->allRecords()->getAsArray();
    $tags = $tag->top()->getAsArray();

    return Inertia::render('Blog/Category/AllCategories/AllCategories', [
      'categories' => $categories,
      'top_tags' => $tags,
    ]);
  }
}
