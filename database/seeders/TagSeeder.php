<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
  private const TABLE_NAME = 'tags';

  public static function getRowsCount()
  {
    return env('TAGS_RC', 50);
  }

  public static function getFakeTags()
  {
    return Storage::json('public/fake/tags.json') ?? [];
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $tags = static::getFakeTags();

    if (count($tags) < $this->getRowsCount()) {
      $exit_code = Artisan::call('fake:tag', [
        '--isolated' => 'true',
        '--append' => 'true',
        '--count' => $this->getRowsCount() - count($tags),
      ]);

      if ($exit_code !== 0) {
        return;
      }

      $tags = static::getFakeTags();
    }

    DB::table(static::TABLE_NAME)->truncate();

    foreach (array_fill(0, static::getRowsCount(), 0) as $i => $_) {
      DB::table(static::TABLE_NAME)->insert($tags[$i]);
    }
  }
}
