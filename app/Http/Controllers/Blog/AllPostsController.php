<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Tag;

class AllPostsController extends Controller
{
  public function render(Tag $tag, Category $category, Post $post)
  {
    $tags = $tag->top()->getAsArray();
    $categories = $category->top()->getAsArray();
    $posts = $post->allRecords()->castCategoriesToArray()->getAsArray();

    return Inertia::render('Blog/Post/AllPosts', [
      'posts' => $posts,
      'top_categories' => $categories,
      'top_tags' => $tags,
    ]);
  }
}
