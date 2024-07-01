<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class SingleCategoryController extends Controller
{
  public function render(Category $category, Post $post, Tag $tag, string $id)
  {
    $cat = $category->byId($id);

    if ($cat->data()->isEmpty()) {
      return abort(404);
    }

    $cat = $cat->data()->first()->toArray();
    $posts = $post
      ->byCategory((int) $id)
      ->castCategoriesToArray()
      ->getAsArray();
    $categories = $category->top()->getAsArray();
    $tags = $tag->top()->getAsArray();

    return Inertia::render('Blog/Category/SingleCategory', [
      'category' => $cat,
      'posts' => $posts,
      'top_categories' => $categories,
      'top_tags' => $tags,
    ]);
  }
}
