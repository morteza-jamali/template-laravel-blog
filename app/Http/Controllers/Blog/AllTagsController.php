<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Inertia\Inertia;

class AllTagsController extends Controller
{
  public function render()
  {
    $tags = Tag::all()->toArray();

    return Inertia::render('Blog/Tag/AllTags/AllTags', [
      'tags' => $tags,
      'top_categories' => getTopCategories(12),
    ]);
  }
}
