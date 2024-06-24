<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class EditTagActionController extends Controller
{
  public function render(Request $request, string $id)
  {
    $rules = TAG_VALIDATION_RULES;

    if (Tag::where('id', $id)->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:tags', $rules['slug']),
        1,
      );
    }

    $validated = $request->validate($rules);

    Tag::where('id', $id)->update($validated);

    return to_route('dashboard.tag.edit', ['id' => $id]);
  }
}
