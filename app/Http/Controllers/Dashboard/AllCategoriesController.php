<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllCategoriesController extends Controller
{
  public function get(Category $category)
  {
    $categories = $category->allRecords()->getAsArray();

    return Inertia::render('Dashboard/Category/All', [
      'categories' => $categories,
    ]);
  }

  public function delete(Category $category, Request $request)
  {
    $category->deleteById($request->input('id'));

    return to_route('dashboard.category.all');
  }
}
