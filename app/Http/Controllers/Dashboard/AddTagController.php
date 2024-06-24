<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class AddTagController extends Controller
{
  public function render(Request $request)
  {
    Tag::create($request->validate(TAG_VALIDATION_RULES));

    return to_route('dashboard.tag.new');
  }
}
