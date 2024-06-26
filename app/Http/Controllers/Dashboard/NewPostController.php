<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewPostController extends Controller
{
  public function get(Category $category)
  {
    $categories = $category->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Post/New', ['categories' => $categories]);
  }
}
