<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  private const TABLE_NAME = 'categories';

  public static function getFakeCategories()
  {
    return Storage::json('public/fake/categories.json') ?? [];
  }

  public static function getRowsCount()
  {
    return env('CATEGORIES_RC', 50);
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $categories = static::getFakeCategories();

    if (count($categories) < $this->getRowsCount()) {
      $exit_code = Artisan::call('fake:category', [
        '--isolated' => 'true',
        '--append' => 'true',
        '--count' => $this->getRowsCount() - count($categories),
      ]);

      if ($exit_code !== 0) {
        return;
      }

      $categories = static::getFakeCategories();
    }

    DB::table(static::TABLE_NAME)->truncate();

    foreach (array_fill(0, static::getRowsCount(), 0) as $i => $_) {
      DB::table(static::TABLE_NAME)->insert($categories[$i]);
    }
  }
}
