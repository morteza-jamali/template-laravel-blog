<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class DeleteTagController extends Controller
{
  public function render(Request $request)
  {
    Tag::whereIn('id', $request->input('id'))->delete();

    return to_route('dashboard.tag.all');
  }
}
