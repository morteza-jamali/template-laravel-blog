<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;

class DashboardController extends Controller
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
    $rules = self::CATEGORY_VALIDATION_RULES;

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
      self::CATEGORY_VALIDATION_RULES,
    );

    Category::create($validated);

    return to_route('dashboard.category.new');
  }

  public function deleteCategory(Request $request)
  {
    Category::whereIn('id', $request->input('id'))->delete();

    return to_route('dashboard.category.all');
  }

  /**
   * Display a listing of the resource.
   */
  // public function index()
  // {
  //   $posts = Post::latest()->get();

  //   return view('index', compact('posts'));
  // }

  /**
   * Store a newly created resource in storage.
   */
  // public function store(Request $request)
  // {
  //   $validated = $request->validate([
  //     'title' => 'required|string|unique:posts|min:5|max:200',
  //     'content' => 'required|string|min:1',
  //   ]);

  //   $validated['slug'] = Str::slug($validated['title'], '-');

  //   Post::create($validated);

  //   return redirect()
  //     ->route('admin')
  //     ->with('notification', 'Post created successfully');
  // }

  /**
   * Display the specified resource.
   */
  // public function show(int $id)
  // {
  //   $post = Post::find($id);

  //   return view('post', compact('post'));
  // }

  // public function admin()
  // {
  //   return view('admin');
  // }
}
