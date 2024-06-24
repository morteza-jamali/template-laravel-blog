<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
  private const CATEGORY_VALIDATION_RULES = [
    'name' => 'required|string|min:5',
    'slug' => [
      'required',
      'min:5',
      'max:200',
      'unique:categories',
      'regex:/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/i',
    ],
    'description' => 'string',
    'parent' => 'required|integer|min:0',
  ];

  private function getParentCategories()
  {
    return Category::select('id', 'name')->get()->toArray();
  }

  private function validateCategory(Request $request, array $rules)
  {
    return $request->validate($rules);
  }

  public function render(Request $request, ?string $id = null, ...$props)
  {
    // TODO: remove $pathname
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

  public function renderNewCategory(Request $request)
  {
    return $this->render($request, null, [
      'categories' => $this->getParentCategories(),
    ]);
  }

  public function renderEditCategory(Request $request, string $id)
  {
    return $this->render($request, $id, [
      'category' => Category::where('id', $id)->get()->toArray()[0],
      'categories' => $this->getParentCategories(),
    ]);
  }

  public function renderAllCategory(Request $request)
  {
    $categories = Arr::map(Category::all()->toArray(), function ($value) {
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
      'categories' => $categories,
    ]);
  }

  public function editCategory(Request $request, string $id)
  {
    $rules = static::CATEGORY_VALIDATION_RULES;

    if (Category::where('id', $id)->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:categories', $rules['slug']),
        1,
      );
    }

    $validated = $this->validateCategory($request, $rules);

    Category::where('id', $id)->update($validated);

    return to_route('dashboard.category.edit', ['id' => $id]);
  }

  public function addCategory(Request $request)
  {
    $validated = $this->validateCategory(
      $request,
      static::CATEGORY_VALIDATION_RULES,
    );

    Category::create($validated);

    return to_route('dashboard.category.new');
  }

  public function deleteCategory(Request $request)
  {
    Category::whereIn('id', $request->input('id'))->delete();

    return to_route('dashboard.category.all');
  }
}
