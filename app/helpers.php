<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

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
  function putJson(string $disk, string $path, array $arr = [])
  {
    Storage::disk($disk)->put("$path.json", json_encode($arr));
  }
}
