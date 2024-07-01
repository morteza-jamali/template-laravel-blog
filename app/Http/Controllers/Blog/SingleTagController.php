<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class SingleTagController extends Controller
{
  public function render(Tag $tag, Post $post, Category $category, string $id)
  {
    $t = $tag->byId($id);

    if ($t->data()->isEmpty()) {
      return abort(404);
    }

    $t = $t->data()->first()->toArray();
    $posts = $post->byTag((int) $id)->castCategoriesToArray()->getAsArray();
    $categories = $category->top()->getAsArray();
    $tags = $tag->top()->getAsArray();

    return Inertia::render('Blog/Tag/SingleTag', [
      'tag' => $t,
      'posts' => $posts,
      'top_categories' => $categories,
      'top_tags' => $tags,
    ]);
  }
}
