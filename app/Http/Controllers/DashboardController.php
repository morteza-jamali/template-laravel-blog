<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
// use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
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

  public function renderNewCategory(Request $request)
  {
    return $this->render($request, null, [
      'categories' => Category::select('ID', 'name')->get()->toArray(),
    ]);
  }

  public function renderAllCategory(Request $request)
  {
    return $this->render($request, null, [
      'categories' => Category::all()->toArray(),
    ]);
  }

  public function addCategory(Request $request)
  {
    $validated = $request->validate([
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
    ]);

    Category::create($validated);

    return to_route('dashboard.category.new');
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
