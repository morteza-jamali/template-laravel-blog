<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NewTagController extends Controller
{
  public function render()
  {
    return Inertia::render('Dashboard/Tag/New');
  }
}
