<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class SingleCategoryController extends Controller
{
  public function render(string $id)
  {
    $category = Category::where('id', $id)->get()->toArray();

    if (empty($category)) {
      return redirect('/404');
    }

    $posts = getPostsByTerm('categories', (int) $id)->toArray();

    return Inertia::render('Blog/Category/SingleCategory', [
      'category' => $category[0],
      'posts' => setPostCategories($posts),
      'top_categories' => getTopCategories(12),
      'top_tags' => getTopTags(12),
    ]);
  }
}
