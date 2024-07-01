<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Post extends Model
{
  use HasFactory;

  protected $posts;
  protected const VALIDATION_RULES = [
    'title' => 'required|string|min:5',
    'slug' => [
      'required',
      'min:5',
      'max:200',
      'unique:posts',
      'regex:/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/i',
    ],
    'content' => 'string|nullable',
    'categories' => ['required', 'string', 'regex:/^(\d+\,)*\d+$/i'],
    'tags' => ['string', 'nullable', 'regex:/^(\d+\,)*\d+$/i'],
    'cover' => 'url|nullable',
    'status' => ['required', 'regex:(publish|draft)'],
  ];
  protected $fillable = [
    'author',
    'view',
    'like',
    'title',
    'slug',
    'content',
    'cover',
    'status',
    'tags',
    'categories',
  ];

  protected function serializeDate(\DateTimeInterface $date): string
  {
    return $date->format('Y-m-d H:i:s');
  }

  public function allRecords(): Post
  {
    $post = new self();
    $post->posts = $this->all();

    return $post;
  }

  public function published(): Post
  {
    $post = new self();
    $post->posts = $this->where('status', 'publish')->get();

    return $post;
  }

  public function byId(int $id): Post
  {
    $post = new self();
    $post->posts = $this->objectById($id)->data()->get();

    return $post;
  }

  public function objectById(int $id): Post
  {
    $post = new self();
    $post->posts = $this->where('id', $id);

    return $post;
  }

  public function publishedById(int $id): Post
  {
    $post = new self();
    $post->posts = $this->objectById($id)
      ->data()
      ->where('status', 'publish')
      ->get();

    return $post;
  }

  public function deleteById(array $ids): Post
  {
    $this->whereIn('id', $ids)->delete();

    return $this;
  }

  public function castCategoriesToArray(): Post
  {
    $post = new self();
    $post->posts = $this->posts->map(function ($p) {
      // FIXME: Improve dependency injection
      $p->categories = app('App\Models\Category')
        ->byStr($p->categories)
        ->getAsArray();

      return $p;
    });

    return $post;
  }

  public function castTagsToArray(): Post
  {
    $post = new self();
    $post->posts = $this->posts->map(function ($p) {
      // FIXME: Improve dependency injection
      if (is_null($p->tags)) {
        return $p;
      }

      $p->tags = app('App\Models\Tag')
        ->byStr($p->tags)
        ->getAsArray();

      return $p;
    });

    return $post;
  }

  public function castTermsToArray(): Post
  {
    return $this->castCategoriesToArray()->castTagsToArray();
  }

  public function edit(Request $request, int $id): Post
  {
    $rules = self::VALIDATION_RULES;

    if ($this->byId($id)->data()->first()->slug == $request->input('slug')) {
      array_splice(
        $rules['slug'],
        array_search('unique:posts', $rules['slug']),
        1,
      );
    }

    $validated = $request->validate($rules);

    $this->where('id', $id)->update($validated);

    return $this;
  }

  public function add(Request $request): Post
  {
    $this->create($request->validate(self::VALIDATION_RULES));

    return $this;
  }

  public function addView(): Post
  {
    $this->posts->increment('view');

    return $this;
  }

  public function incrementLike(): Post
  {
    $this->posts->increment('like');

    return $this;
  }

  public function decrementLike(): Post
  {
    $this->posts->decrement('like');

    return $this;
  }

  protected function makeRegex(int $id): array
  {
    return ["\,$id\,", "^$id\,", "\,$id$"];
  }

  public function byTerm(string $term, int $id): Post
  {
    $post = new self();
    $operator = 'REGEXP';
    $regexp = $this->makeRegex($id);

    $post->posts = $this->where($term, $operator, $regexp[0])
      ->orWhere($term, $operator, $regexp[1])
      ->orWhere($term, $operator, $regexp[2])
      ->get();

    return $post;
  }

  public function byCategory(int $id): Post
  {
    return $this->byTerm('categories', $id);
  }

  public function byTag(int $id): Post
  {
    return $this->byTerm('tags', $id);
  }

  public function prev(): Post
  {
    $post = new self();
    $post->posts = collect([
      $this->where('id', '<', $this->posts->first()->id)
        ->where('status', 'publish')
        ->orderBy('id', 'desc')
        ->first(),
    ]);

    return $post;
  }

  public function next(): Post
  {
    $post = new self();
    $post->posts = collect([
      $this->where('id', '>', $this->posts->first()->id)
        ->where('status', 'publish')
        ->orderBy('id', 'asc')
        ->first(),
    ]);

    return $post;
  }

  public function recent(?int $count = 10): Post
  {
    $post = new self();
    $post->posts = $this->get()
      ->sortByDesc('created_at')
      ->take($count)
      ->values();

    return $post;
  }

  public function top(?int $count = 10): Post
  {
    $post = new self();
    $post->posts = $this->get()->sortByDesc('like')->take($count)->values();

    return $post;
  }

  public function trend(?int $count = 10): Post
  {
    $post = new self();
    $post->posts = $this->get()->sortByDesc('view')->take($count)->values();

    return $post;
  }

  public function getAsArray(): array
  {
    return $this->posts->toArray();
  }

  public function data()
  {
    return $this->posts;
  }
}
