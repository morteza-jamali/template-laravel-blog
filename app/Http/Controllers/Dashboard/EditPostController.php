<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class EditPostController extends Controller
{
  public function get(Post $post, Category $category, Tag $tag, string $id)
  {
    $p = $post->byId($id)->castTermsToArray()->data()->first()->toArray();
    $categories = $category->allRecords()->getAsArray();
    $tags = $tag->allRecords()->getAsArray();

    Arr::pull($p, 'like');
    Arr::pull($p, 'view');
    Arr::pull($p, 'created_at');
    Arr::pull($p, 'updated_at');

    return Inertia::render('Dashboard/Post/Edit', [
      'post' => $p,
      'categories' => $categories,
      'tags' => $tags,
    ]);
  }
}
