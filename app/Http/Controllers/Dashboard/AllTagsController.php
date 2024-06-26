<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllTagsController extends Controller
{
  public function get(Tag $tag)
  {
    $tags = $tag->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Tag/All', [
      'tags' => $tags,
    ]);
  }

  public function delete(Request $request, Tag $tag)
  {
    $tag->deleteById($request->input('id'));

    return to_route('dashboard.tag.all');
  }
}
