<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
  private const ROWS_COUNT = 50;

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('categories')->truncate();

    $fakeTimeStamp = function () {
      return Carbon::createFromFormat(
        'Y-m-d H:i:s',
        fake()->date('Y-m-d') . ' ' . fake()->time('H:i:s'),
      );
    };

    foreach (array_fill(0, static::ROWS_COUNT, 0) as $_) {
      $slug = fake()->slug(3, false);
      $name = Str::title(Str::replace('-', ' ', $slug));
      $description = fake()->numberBetween(0, 3) === 1 ? null : fake()->text();
      $count = fake()->numberBetween(0, 3) === 1 ? 0 : fake()->randomNumber(4);
      $created_at = $fakeTimeStamp();
      $updated_at = Carbon::parse($created_at)->addYears(
        fake()->numberBetween(1, 3),
      );

      // TODO: seed `parent` column
      DB::table('categories')->insert([
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
