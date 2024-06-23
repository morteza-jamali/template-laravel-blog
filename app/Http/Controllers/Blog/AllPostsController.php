<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;

class AllPostsController extends Controller
{
  public function render()
  {
    return Inertia::render('Blog/Post/AllPosts', [
      'posts' => setPostCategories(Post::get()->toArray()),
      'top_categories' => getTopCategories(12),
      'top_tags' => getTopTags(12),
    ]);
  }
}
