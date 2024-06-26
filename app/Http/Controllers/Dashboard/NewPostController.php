<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewPostController extends Controller
{
  public function get(Category $category, Tag $tag)
  {
    $categories = $category->allRecords()->getAsArray();
    $tags = $tag->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Post/New', [
      'categories' => $categories,
      'tags' => $tags,
    ]);
  }

  public function post(
    Request $request,
    Tag $tag,
    Category $category,
    Post $post,
  ) {
    $p = $request->input();

    $categories_ids = array_values($p['categories']);
    $p['categories'] = implode(',', $categories_ids);

    $category->objectById($categories_ids)->incrementCount();

    if ($request->has('tags')) {
      $new_tags = Arr::where($p['tags'], function (array $value) {
        return is_null($value['value']);
      });
      $new_tags = Arr::map($new_tags, function (array $value) {
        return [
          'name' => $value['label'],
          'slug' => Str::slug($value['label']),
          'count' => 1,
        ];
      });

      if (!empty($new_tags)) {
        $new_tags = $tag->addMultiple($new_tags)->getAsArray();
      }

      $available_tags = Arr::where($p['tags'], function (array $value) {
        return !is_null($value['value']);
      });
      $available_tags = Arr::map(
        $available_tags,
        fn(array $value) => $value['value'],
      );

      $tags = array_merge(Arr::pluck($new_tags, 'id'), $available_tags);

      $tag->objectById($available_tags)->incrementCount();

      $p['tags'] = implode(',', $tags);
    }

    $new_request = new Request();
    $new_request->replace($p);

    $post->add($new_request);

    return to_route('dashboard.post.new');
  }
}
