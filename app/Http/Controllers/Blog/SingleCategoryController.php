<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;

class SingleCategoryController extends Controller
{
  private function makeRegex(string $id)
  {
    return ["\,$id\,", "^$id\,", "\,$id$"];
  }

  public function render(string $id)
  {
    $category = Category::where('id', $id)->get()->toArray();

    if (empty($category)) {
      return redirect('/404');
    }

    $regexp = $this->makeRegex($id);
    $column = 'categories';
    $operator = 'REGEXP';

    $posts = Post::where($column, $operator, $regexp[0])
      ->orWhere($column, $operator, $regexp[1])
      ->orWhere($column, $operator, $regexp[2])
      ->get()
      ->toArray();

    return Inertia::render('Blog/Category/SingleCategory', [
      'category' => $category[0],
      'posts' => setPostCategories($posts),
      'top_categories' => getTopCategories(12),
      'top_tags' => getTopTags(12),
    ]);
  }
}
