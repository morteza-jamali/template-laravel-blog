<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\Tag;

class TagController extends Controller
{
  public function render(Request $request, ?string $id = null, ...$props)
  {
    $pathname = $request->path();

    if (!is_null($id)) {
      $pathname = explode('/', $pathname);
      array_pop($pathname);
      $pathname = implode('/', $pathname);
    }

    $pathname = Str::replace('/', '_%_', $pathname);
    $view = Str::replace('%', '/', Str::studly($pathname));
    $pathname = Str::replace('_%_', '.', $pathname);
    $data = [
      'pathname' => $pathname,
    ];

    foreach ($props as $p) {
      $data = [...$data, ...$p];
    }

    return Inertia::render($view, $data);
  }

  public function renderAllTag(Request $request)
  {
    $tags = Arr::map(Tag::all()->toArray(), function ($value) {
      $new_value = $value;

      foreach (['created_at', 'updated_at'] as $key) {
        $new_value = Arr::set(
          $new_value,
          $key,
          Carbon::parse($new_value[$key])->format('Y/m/d H:i:s'),
        );
      }

      return $new_value;
    });

    return $this->render($request, null, [
      'tags' => $tags,
    ]);
  }

  public function deleteTag(Request $request)
  {
    Tag::whereIn('id', $request->input('id'))->delete();

    return to_route('dashboard.tag.all');
  }
}
