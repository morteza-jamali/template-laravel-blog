<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
  private const TABLE_NAME = 'tags';

  public static function getRowsCount()
  {
    return env('TAGS_RC', 50);
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table(static::TABLE_NAME)->truncate();

    $fakeTimeStamp = function () {
      return Carbon::createFromFormat(
        'Y-m-d H:i:s',
        fake()->date('Y-m-d') . ' ' . fake()->time('H:i:s'),
      );
    };

    foreach (array_fill(0, static::getRowsCount(), 0) as $_) {
      $slug = fake()->slug(3, false);
      $name = Str::title(Str::replace('-', ' ', $slug));
      $description = fake()->numberBetween(0, 3) === 1 ? null : fake()->text();
      $count = fake()->numberBetween(0, 3) === 1 ? 0 : fake()->randomNumber(4);
      $created_at = $fakeTimeStamp();
      $updated_at = Carbon::parse($created_at)->addYears(
        fake()->numberBetween(1, 3),
      );

      DB::table(static::TABLE_NAME)->insert([
        'name' => $name,
        'slug' => $slug,
        'description' => $description,
        'count' => $count,
        'created_at' => $created_at,
        'updated_at' => $updated_at,
      ]);
    }
  }
}
