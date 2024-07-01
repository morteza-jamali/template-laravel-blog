<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\Request;

class SinglePostController extends Controller
{
  public function render(Post $post, string $id)
  {
    // dd(session('apple'));

    $p = $post->publishedById($id);

    if ($p->data()->isEmpty()) {
      abort(404);
    }

    $previous_post = $p->prev()->data()->first();
    $next_post = $p->next()->data()->first();

    $complete_post = $p->castTermsToArray()->data()->first()->toArray();
    $previous_post = is_null($previous_post) ? null : $previous_post->toArray();
    $next_post = is_null($next_post) ? null : $next_post->toArray();

    $post->objectById($id)->addView();

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $complete_post,
      'next_post' => $next_post,
      'previous_post' => $previous_post,
    ]);
  }

  public function like(Post $post, Request $request, string $id)
  {
    // session('liked_posts')
    // session(['liked' => 'bnana']);

    if ($request->input('func') === 'increment') {
      $post->objectById($id)->incrementLike();
    }

    if ($request->input('func') === 'decrement') {
      $post->objectById($id)->decrementLike();
    }
  }
}
