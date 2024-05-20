<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Database\Seeders\CategorySeeder;
use Database\Seeders\TagSeeder;

class PostSeeder extends Seeder
{
  private const TABLE_NAME = 'posts';

  public static function getRowsCount()
  {
    return env('POSTS_RC', 50);
  }

  private function getTrueOrFalse(?int $length = 3)
  {
    if (fake()->numberBetween(0, $length) === $length - 1) {
      return true;
    }

    return false;
  }

  private function fakeTerms(int $max_count)
  {
    return implode(',', fake()->randomElements(range(1, $max_count), null));
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
      $slug = fake()->slug(fake()->numberBetween(3, 10), false);
      $title = Str::title(Str::replace('-', ' ', $slug));
      $content = fake()->paragraphs(fake()->numberBetween(3, 10), true);
      $cover = fake()->imageUrl(
        width: fake()->numberBetween(3, 9) * 100,
        height: fake()->numberBetween(3, 6) * 100,
      );
      $status = $this->getTrueOrFalse() ? 'publish' : 'draft';
      $tags = $this->fakeTerms(TagSeeder::getRowsCount());
      $categories = $this->fakeTerms(CategorySeeder::getRowsCount());
      $created_at = $fakeTimeStamp();
      $updated_at = $this->getTrueOrFalse()
        ? $created_at
        : Carbon::parse($created_at)->addYears(fake()->numberBetween(1, 3));

      DB::table(static::TABLE_NAME)->insert([
        'title' => $title,
        'slug' => $slug,
        'content' => $content,
        'cover' => $cover,
        'status' => $status,
        'tags' => $tags,
        'categories' => $categories,
        'created_at' => $created_at,
        'updated_at' => $updated_at,
      ]);
    }
  }
}
