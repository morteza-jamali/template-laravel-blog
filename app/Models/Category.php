<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  use HasFactory;

  protected $categories;
  protected $fillable = ['name', 'slug', 'description', 'parent', 'count'];

  protected function serializeDate(\DateTimeInterface $date): string
  {
    return $date->format('Y-m-d H:i:s');
  }

  public function allRecords(): Category
  {
    $category = new self();
    $category->categories = $this->all();

    return $category;
  }

  public function top(?int $count = 12): Category
  {
    $category = new self();
    $category->categories = $this->get()
      ->sortByDesc('count')
      ->take($count)
      ->values();

    return $category;
  }

  public function byStr(string $str): Category
  {
    $category = new self();
    $category->categories = $this->whereIn('id', explodeTerm($str))->get();

    return $category;
  }

  public function byId(int $id): Category
  {
    $category = new self();
    $category->categories = $this->where('id', $id)->get();

    return $category;
  }

  public function getAsArray(): array
  {
    return $this->categories->toArray();
  }

  public function data()
  {
    return $this->categories;
  }
}
