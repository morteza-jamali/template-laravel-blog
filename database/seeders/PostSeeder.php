<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
  private const TABLE_NAME = 'posts';

  public static function getFakePosts()
  {
    return Storage::json('public/fake/posts.json') ?? [];
  }

  public static function getRowsCount()
  {
    return env('POSTS_RC', 50);
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $posts = static::getFakePosts();

    if (count($posts) < $this->getRowsCount()) {
      $exit_code = Artisan::call('fake:post', [
        '--isolated' => '1',
        '--append' => 'true',
        '--tagscount' => count(TagSeeder::getFakeTags()),
        '--categoriescount' => count(CategorySeeder::getFakeCategories()),
        '--count' => $this->getRowsCount() - count($posts),
      ]);

      if ($exit_code !== 0) {
        return;
      }

      $posts = static::getFakePosts();
    }

    DB::table(static::TABLE_NAME)->truncate();

    foreach (array_fill(0, static::getRowsCount(), 0) as $i => $_) {
      DB::table(static::TABLE_NAME)->insert($posts[$i]);
    }
  }
}
