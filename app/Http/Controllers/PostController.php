<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    $request->validate([
      'title' => 'required|max:255',
      'body' => 'required',
    ]);

    Post::create($request->all());

    return redirect()
      ->route('posts.index')
      ->with('success', 'Post created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $post = Post::find($id);

    return view('show', compact('post'));
  }

  public function create()
  {
    return view('create');
  }
}
