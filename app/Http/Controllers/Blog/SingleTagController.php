<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Inertia\Inertia;

class SingleTagController extends Controller
{
  public function render(string $id)
  {
    $tag = Tag::where('id', $id)->get()->toArray();

    if (empty($tag)) {
      return redirect('/404');
    }

    $posts = getPostsByTerm('tags', (int) $id)->toArray();

    return Inertia::render('Blog/Tag/SingleTag', [
      'tag' => $tag[0],
      'posts' => setPostCategories($posts),
      'top_categories' => getTopCategories(12),
      'top_tags' => getTopTags(12),
    ]);
  }
}
