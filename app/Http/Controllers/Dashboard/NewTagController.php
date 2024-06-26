<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewTagController extends Controller
{
  public function get()
  {
    return Inertia::render('Dashboard/Tag/New');
  }

  public function post(Request $request, Tag $tag)
  {
    $tag->add($request);

    return to_route('dashboard.tag.new');
  }
}
