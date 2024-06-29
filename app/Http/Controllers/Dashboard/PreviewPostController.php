<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
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

    $post['categories'] = $category
      ->byStr(implode(',', array_values($post['categories'])))
      ->getAsArray();

    if ($request->has('tags')) {
      $id_range = $tag->idRange();

      $new_tags = Arr::where($post['tags'], function (array $value) {
        return is_null($value['value']);
      });
      $new_tags = Arr::map($new_tags, function (array $value) use (
        &$id_range,
        $post,
      ) {
        return [
          'id' => ++$id_range,
          'name' => $value['label'],
          'slug' => Str::slug($value['label']),
          'description' => null,
          'count' => 0,
          'created_at' => $post['created_at'],
          'updated_at' => $post['updated_at'],
        ];
      });

      $available_tags = Arr::where($post['tags'], function (array $value) {
        return !is_null($value['value']);
      });
      $available_tags = Arr::map(
        $available_tags,
        fn(array $value) => $value['value'],
      );

      $post['tags'] = $tag->byStr(implode(',', $available_tags))->getAsArray();
      $post['tags'] = array_merge($post['tags'], $new_tags);
    }

    return Inertia::render('Blog/Post/SinglePost', [
      'post' => $post,
    ]);
  }
}
