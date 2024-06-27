<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;

class NewPostController extends Controller
{
  public function get(Category $category, Tag $tag)
  {
    $categories = $category->allRecords()->getAsArray();
    $tags = $tag->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Post/New', [
      'categories' => $categories,
      'tags' => $tags,
    ]);
  }
}
