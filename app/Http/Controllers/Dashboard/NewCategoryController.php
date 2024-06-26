<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewCategoryController extends Controller
{
  public function get(Category $category)
  {
    $categories = $category->parent()->getAsArray();

    return Inertia::render('Dashboard/Category/New', [
      'categories' => $categories,
    ]);
  }

  public function post(Category $category, Request $request)
  {
    $category->add($request);

    return to_route('dashboard.category.new');
  }
}
