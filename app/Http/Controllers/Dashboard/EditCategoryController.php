<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditCategoryController extends Controller
{
  public function get(Category $category, string $id)
  {
    $cat = $category->byId($id)->data()->first()->toArray();
    $categories = $category->parent()->getAsArray();

    return Inertia::render('Dashboard/Category/Edit', [
      'category' => $cat,
      'categories' => $categories,
    ]);
  }

  public function patch(Request $request, Category $category, string $id)
  {
    $category->edit($request, (int) $id);

    return to_route('dashboard.category.edit', ['id' => $id]);
  }
}
