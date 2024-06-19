<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;

class HomeController extends Controller
{
  private function setCategories($data)
  {
    return Arr::map($data, function (array $value) {
      $categories = Category::whereIn('id', explode(',', $value['categories']))
        ->get()
        ->toArray();

      $value['categories'] = $categories;

      return $value;
    });
  }

  private function getTopPosts(?int $count = 10)
  {
    return Arr::take(Post::get()->sortByDesc('like')->toArray(), $count);
  }

  public function render()
  {
    return Inertia::render('Home', [
      'top_posts' => $this->setCategories($this->getTopPosts(3)),
    ]);
  }
}
