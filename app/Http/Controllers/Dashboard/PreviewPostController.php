<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreviewPostController extends Controller
{
  public function get()
  {
    return Inertia::render('Dashboard/Post/Preview');
  }

  public function post(Request $request, Category $category, Tag $tag)
  {
    $post = $request->input();

    dd($post['tags']);

    $post['categories'] = $category
      ->byStr(implode(',', array_values($post['categories'])))
      ->getAsArray();

    if ($request->has('tags')) {
      $post['tags'] = $tag
        ->byStr(implode(',', array_values($post['tags'])))
        ->getAsArray();
    }

    dd($post);

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $post,
    ]);
  }
}
