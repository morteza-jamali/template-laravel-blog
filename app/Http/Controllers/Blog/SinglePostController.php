<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;

class SinglePostController extends Controller
{
  public function render(string $id)
  {
    $post = Post::where('id', $id)->get()->toArray();
    $post = setPostCategories($post);
    $post = setPostTags($post);
    $post = $post[0];

    $previous_post = Post::where('id', '<', $post['id'])
      ->orderBy('id', 'desc')
      ->first()
      ->toArray();
    $next_post = Post::where('id', '>', $post['id'])
      ->orderBy('id', 'asc')
      ->first()
      ->toArray();

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $post,
      'next_post' => $next_post,
      'previous_post' => $previous_post,
    ]);
  }
}
