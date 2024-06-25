<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;

class SinglePostController extends Controller
{
  public function render(Post $post, string $id)
  {
    $p = $post->byId($id);
    $complete_post = $p->castTermsToArray()->data()->first()->toArray();
    $previous_post = $p->prev()->data()->first()->toArray();
    $next_post = $p->next()->data()->first()->toArray();

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $complete_post,
      'next_post' => $next_post,
      'previous_post' => $previous_post,
    ]);
  }
}
