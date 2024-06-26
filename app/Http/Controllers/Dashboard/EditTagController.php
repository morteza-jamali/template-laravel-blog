<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditTagController extends Controller
{
  public function get(Tag $tag, string $id)
  {
    $t = $tag->byId($id)->data()->first()->toArray();

    return Inertia::render('Dashboard/Tag/Edit', ['tag' => $t]);
  }

  public function patch(Request $request, Tag $tag, string $id)
  {
    $tag->edit($request, (int) $id);

    return to_route('dashboard.tag.edit', ['id' => $id]);
  }
}
