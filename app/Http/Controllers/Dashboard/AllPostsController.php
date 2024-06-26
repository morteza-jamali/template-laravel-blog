<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllPostsController extends Controller
{
  public function get(Post $post)
  {
    $posts = $post->allRecords()->castTermsToArray()->getAsArray();

    return Inertia::render('Dashboard/Post/All', [
      'posts' => $posts,
    ]);
  }

  public function delete(Request $request, Post $post)
  {
    $post->deleteById($request->input('id'));

    return to_route('dashboard.post.all');
  }
}
