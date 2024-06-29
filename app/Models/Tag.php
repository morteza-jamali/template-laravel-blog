<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class Tag extends Model
{
  use HasFactory;

  protected $tags;
  protected const VALIDATION_RULES = [
    'name' => 'required|string|min:5',
    'slug' => [
      'required',
      'min:5',
      'max:200',
      'unique:tags',
      'regex:/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/i',
    ],
    'description' => 'string',
  ];
  protected $fillable = ['name', 'slug', 'description', 'count'];

  protected function serializeDate(\DateTimeInterface $date): string
  {
    return $date->format('Y-m-d H:i:s');
  }

  public function top(?int $count = 12): Tag
  {
    $tag = new self();
    $tag->tags = $this->get()->sortByDesc('count')->take($count)->values();

    return $tag;
  }

  public function allRecords(): Tag
  {
    $tag = new self();
    $tag->tags = $this->all();

    return $tag;
  }

  public function byStr(string $str): Tag
  {
    $tag = new self();
    $tag->tags = $this->whereIn('id', explodeTerm($str))->get();

    return $tag;
  }

  public function byId(int|array $id): Tag
  {
    $tag = new self();
    $tag->tags = $this->whereIn('id', is_array($id) ? $id : [$id])->get();

    return $tag;
  }

  public function add(Request $request): Tag
  {
    $this->create($request->validate(self::VALIDATION_RULES));

    return $this;
  }

  public function addMultiple(array $rows): Tag
  {
    $ids = [];

    foreach ($rows as $row) {
      foreach (['created_at', 'updated_at'] as $date) {
        if (!Arr::exists($row, $date)) {
          $row[$date] = now();
        }
      }

      $ids[] = $this->insertGetId($row);
    }

    return $this->byId($ids);
  }

  public function idRange(): int
  {
    return (int) $this->get('id')->sortByDesc('id')->first()->toArray()['id'];
  }

  public function edit(Request $request, int $id): Tag
  {
    $rules = self::VALIDATION_RULES;

    if ($this->byId($id)->data()->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:tags', $rules['slug']),
        1,
      );
    }

    $validated = $request->validate($rules);

    $this->where('id', $id)->update($validated);

    return $this;
  }

  public function incrementCount(): Tag
  {
    $this->tags->increment();

    return $this;
  }

  public function deleteById(array $ids): Tag
  {
    $this->whereIn('id', $ids)->delete();

    return $this;
  }

  public function getAsArray(): array
  {
    return $this->tags->toArray();
  }

  public function data()
  {
    return $this->tags;
  }
}
