<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Inertia\Inertia;

class AllTagsController extends Controller
{
  public function render()
  {
    $tags = Tag::all()->toArray();

    return Inertia::render('Dashboard/Tag/All', [
      'tags' => $tags,
    ]);
  }
}
