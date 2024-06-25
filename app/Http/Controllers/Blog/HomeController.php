<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function render(Post $post, Tag $tag, Category $category)
  {
    $recent_posts = $post->recent()->castCategoriesToArray()->getAsArray();
    $top_posts = $post->top(3)->castCategoriesToArray()->getAsArray();
    $trending_posts = $post->trend(6)->castCategoriesToArray()->getAsArray();
    $tags = $tag->top()->getAsArray();
    $categories = $category->top()->getAsArray();

    return Inertia::render('Blog/Home', [
      'top_posts' => $top_posts,
      'trending_posts' => $trending_posts,
      'top_categories' => $categories,
      'top_tags' => $tags,
      'recent_posts' => $recent_posts,
    ]);
  }
}
