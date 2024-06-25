<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
  use HasFactory;

  protected $tags;
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

  public function byId(int $id): Tag
  {
    $tag = new self();
    $tag->tags = $this->where('id', $id)->get();

    return $tag;
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
