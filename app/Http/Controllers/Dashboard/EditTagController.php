<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Inertia\Inertia;

class EditTagController extends Controller
{
  public function render(string $id)
  {
    $tag = Tag::where('id', $id)->get()->toArray()[0];

    return Inertia::render('Dashboard/Tag/Edit', ['tag' => $tag]);
  }
}
