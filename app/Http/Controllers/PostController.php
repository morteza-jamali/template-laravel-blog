<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $posts = Post::all();

    return view('index', compact('posts'));
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|string|unique:posts|min:5|max:100',
      'content' => 'required|string|min:5|max:2000',
    ]);

    $validated['slug'] = Str::slug($validated['title'], '-');

    Post::create($validated);

    return redirect()
      ->route('index')
      ->with('success', 'Post created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $post = Post::find($id);

    return view('post', compact('post'));
  }

  public function admin()
  {
    return view('admin');
  }
}
