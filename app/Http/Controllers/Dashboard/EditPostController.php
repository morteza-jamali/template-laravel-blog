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

class EditPostController extends Controller
{
  public function get(Post $post, Category $category, Tag $tag, string $id)
  {
    $p = $post->byId($id)->castTermsToArray()->data()->first()->toArray();
    $categories = $category->allRecords()->getAsArray();
    $tags = $tag->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Post/Edit', [
      'post' => $p,
      'categories' => $categories,
      'tags' => $tags,
    ]);
  }

  public function patch(
    Request $request,
    Post $post,
    Category $category,
    Tag $tag,
    string $id,
  ) {
    $new_post = $request->input();

    foreach (['tags', 'cover', 'content'] as $f) {
      if (!array_key_exists($f, $new_post)) {
        $new_post[$f] = null;
      }
    }

    $old_post = $post
      ->byId($id)
      ->castTermsToArray()
      ->data()
      ->first()
      ->toArray();

    $removed_categories = array_diff(
      Arr::pluck($old_post['categories'], 'id'),
      $new_post['categories'],
    );

    $added_categories = array_diff(
      $new_post['categories'],
      Arr::pluck($old_post['categories'], 'id'),
    );

    $new_post['categories'] = implode(
      ',',
      array_values($new_post['categories']),
    );

    $category->objectById(array_values($added_categories))->incrementCount();
    $category->objectById(array_values($removed_categories))->decrementCount();

    $new_tags = Arr::where($new_post['tags'] ?? [], function (array $value) {
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

    $available_tags = Arr::where($new_post['tags'] ?? [], function (
      array $value,
    ) {
      return !is_null($value['value']);
    });
    $available_tags = Arr::map(
      $available_tags,
      fn(array $value) => $value['value'],
    );

    $tags = array_merge(Arr::pluck($new_tags, 'id'), $available_tags);
    $removed_tags = array_diff(
      Arr::pluck($old_post['tags'] ?? [], 'id'),
      $tags,
    );
    $added_tags = array_diff($tags, Arr::pluck($old_post['tags'] ?? [], 'id'));

    $tag->objectById($removed_tags)->decrementCount();
    $tag->objectById($added_tags)->incrementCount();

    if ($request->has('tags')) {
      $new_post['tags'] = implode(',', $tags);
    }

    $new_request = new Request();
    $new_request->replace($new_post);

    $post->edit($new_request, (int) $id);

    return to_route('dashboard.post.edit', ['id' => $id]);
  }
}
