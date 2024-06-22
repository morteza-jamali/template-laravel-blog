<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;

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

  private function getRecentPosts(?int $count = 10)
  {
    return array_values(
      Post::get()->sortByDesc('created_at')->take($count)->toArray(),
    );
  }

  private function getTopTags(?int $count = 10)
  {
    return array_values(
      Tag::get()->sortByDesc('count')->take($count)->toArray(),
    );
  }

  private function getTopCategories(?int $count = 10)
  {
    return array_values(
      Category::get()->sortByDesc('count')->take($count)->toArray(),
    );
  }

  private function getTopPosts(?int $count = 10)
  {
    return array_values(
      Post::get()->sortByDesc('like')->take($count)->toArray(),
    );
  }

  private function getTrendingPosts(?int $count = 10)
  {
    return array_values(
      Post::get()->sortByDesc('view')->take($count)->toArray(),
    );
  }

  public function render()
  {
    return Inertia::render('Home', [
      'top_posts' => $this->setCategories($this->getTopPosts(3)),
      'trending_posts' => $this->setCategories($this->getTrendingPosts(6)),
      'top_categories' => $this->getTopCategories(12),
      'top_tags' => $this->getTopTags(12),
      'recent_posts' => $this->setCategories($this->getRecentPosts()),
    ]);
  }
}
