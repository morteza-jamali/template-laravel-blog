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
  private const TAG_VALIDATION_RULES = [
    'name' => 'required|string|min:5',
    'slug' => [
      'required',
      'min:5',
      'max:200',
      'unique:tags',
      'regex:/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/i',
    ],
    'description' => 'string',
  ];

  private function validateTag(Request $request, array $rules)
  {
    return $request->validate($rules);
  }

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

  public function renderNewTag(Request $request)
  {
    return $this->render($request);
  }

  public function addTag(Request $request)
  {
    $validated = $this->validateTag($request, static::TAG_VALIDATION_RULES);

    Tag::create($validated);

    return to_route('dashboard.tag.new');
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

  public function editTag(Request $request, string $id)
  {
    $rules = static::TAG_VALIDATION_RULES;

    if (Tag::where('id', $id)->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:tags', $rules['slug']),
        1,
      );
    }

    $validated = $this->validateTag($request, $rules);

    Tag::where('id', $id)->update($validated);

    return to_route('dashboard.tag.edit', ['id' => $id]);
  }

  public function renderEditTag(Request $request, string $id)
  {
    return $this->render($request, $id, [
      'tag' => Tag::where('id', $id)->get()->toArray()[0],
    ]);
  }
}
