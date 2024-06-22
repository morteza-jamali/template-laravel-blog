<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Category;
use App\Models\Tag;

if (!function_exists('getTrueOrFalse')) {
  function getTrueOrFalse(?int $length = 2)
  {
    if (fake()->numberBetween(0, $length) === $length - 1) {
      return true;
    }

    return false;
  }
}

if (!function_exists('fakeTimeStamp')) {
  function fakeTimeStamp()
  {
    return Carbon::createFromFormat(
      'Y-m-d H:i:s',
      fake()->date('Y-m-d') . ' ' . fake()->time('H:i:s'),
    );
  }
}

if (!function_exists('putJson')) {
  function putJson(
    string $disk,
    string $path,
    array $arr = [],
    bool $append = false,
  ) {
    $file = "$path.json";
    $sd = Storage::disk($disk);

    if ($append) {
      $array = [];

      try {
        $array = File::json($sd->path($file));
      } catch (Exception $e) {
      }

      $arr = Arr::collapse([$array, $arr]);
    }

    $sd->put($file, json_encode($arr));
  }
}

if (!function_exists('fakeHtml')) {
  function fakeHtml()
  {
    $length = getTrueOrFalse() ? 'long' : 'short';

    return Http::get(
      "https://loripsum.net/api/10/$length/decorate/link/ul/dl/ol/bq/code/headers",
    )->body();
  }
}

if (!function_exists('fakeTerms')) {
  function fakeTerms(int $max_count)
  {
    return implode(',', fake()->randomElements(range(1, $max_count), null));
  }
}

if (!function_exists('setPostCategories')) {
  function setPostCategories($data)
  {
    return Arr::map($data, function (array $value) {
      $categories = Category::whereIn('id', explode(',', $value['categories']))
        ->get()
        ->toArray();

      $value['categories'] = $categories;

      return $value;
    });
  }
}

if (!function_exists('setPostTags')) {
  function setPostTags($data)
  {
    return Arr::map($data, function (array $value) {
      $tags = Tag::whereIn('id', explode(',', $value['tags']))
        ->get()
        ->toArray();

      $value['tags'] = $tags;

      return $value;
    });
  }
}
