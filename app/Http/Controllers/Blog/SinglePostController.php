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
    $p = $post->publishedById($id);

    if ($p->data()->isEmpty()) {
      abort(404);
    }

    $previous_post = $p->prev()->data()->first();
    $next_post = $p->next()->data()->first();

    $complete_post = $p->castTermsToArray()->data()->first()->toArray();
    $previous_post = is_null($previous_post) ? null : $previous_post->toArray();
    $next_post = is_null($next_post) ? null : $next_post->toArray();

    $seen_posts = collect(session('seen_posts', []));
    $liked_posts = collect(session('liked_posts', []));

    if (!$seen_posts->contains($id)) {
      $post->objectById($id)->addView();
      $seen_posts->push($id);
      session(['seen_posts' => $seen_posts->toArray()]);
    }

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $complete_post,
      'next_post' => $next_post,
      'previous_post' => $previous_post,
      'liked' => $liked_posts->contains($id),
    ]);
  }

  public function like(Post $post, Request $request, string $id)
  {
    $liked_posts = collect(session('liked_posts', []));

    if (
      !$liked_posts->contains($id) &&
      $request->input('func') === 'increment'
    ) {
      $post->objectById($id)->incrementLike();
      $liked_posts->push($id);
      session(['liked_posts' => $liked_posts->toArray()]);
    }

    if (
      $liked_posts->contains($id) &&
      $request->input('func') === 'decrement'
    ) {
      $post->objectById($id)->decrementLike();
      $liked_posts->pull($liked_posts->search($id));
      session(['liked_posts' => $liked_posts->toArray()]);
    }

    return to_route('blog.post.singlepost', ['id' => $id]);
  }
}
