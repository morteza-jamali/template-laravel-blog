<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;

class AllTagsController extends Controller
{
  public function render(Tag $tag, Category $category)
  {
    $tags = $tag->allRecords()->getAsArray();
    $categories = $category->top()->getAsArray();

    return Inertia::render('Blog/Tag/AllTags/AllTags', [
      'tags' => $tags,
      'top_categories' => $categories,
    ]);
  }
}
