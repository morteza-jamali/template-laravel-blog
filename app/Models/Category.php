<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Category extends Model
{
  use HasFactory;

  protected $categories;
  protected const VALIDATION_RULES = [
    'name' => 'required|string|min:5',
    'slug' => [
      'required',
      'min:5',
      'max:200',
      'unique:categories',
      'regex:/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/i',
    ],
    'description' => 'string',
    'parent' => 'required|integer|min:0',
  ];
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

  public function add(Request $request): Category
  {
    $this->create($request->validate(self::VALIDATION_RULES));

    return $this;
  }

  public function edit(Request $request, int $id): Category
  {
    $rules = self::VALIDATION_RULES;

    if ($this->byId($id)->data()->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:categories', $rules['slug']),
        1,
      );
    }

    $validated = $request->validate($rules);

    $this->where('id', $id)->update($validated);

    return $this;
  }

  public function deleteById(array $ids): Category
  {
    $this->whereIn('id', $ids)->delete();

    return $this;
  }

  public function parent(): Category
  {
    $category = new self();
    $category->categories = $this->select('id', 'name')->get();

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
