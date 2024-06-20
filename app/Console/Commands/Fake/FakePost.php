<?php

namespace App\Console\Commands\Fake;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Console\Isolatable;
use Illuminate\Support\Arr;

class FakePost extends Command implements Isolatable
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'fake:post
                            {--A|append : Append new data}
                            {--T|tagscount=50 : Maximum tags count}
                            {--K|categoriescount=3 : Maximum categories count}
                            {--S|savepics : Whether to save pictures or not}
                            {--C|count=50 : Fake posts count}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate fake posts';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    foreach (
      Arr::only($this->options(), ['count', 'tagscount', 'categoriescount'])
      as $key => $value
    ) {
      if (((int) $value) < 1) {
        $this->error("$key should be greater than 0");

        return 1;
      }
    }

    $posts = [];
    $sd = Storage::disk('public');
    $count = (int) $this->option('count');
    $savepics = $this->option('savepics');
    $append = $this->option('append');
    $cover_width = fake()->numberBetween(3, 9) * 100;
    $cover_height = fake()->numberBetween(3, 6) * 100;
    $bar = $this->output->createProgressBar($count);

    if ($savepics) {
      if (!$append) {
        $sd->deleteDirectory('images');
      }

      $sd->makeDirectory('images');
    }

    foreach (array_fill(0, $count, 0) as $_) {
      $slug = fake()->slug(fake()->numberBetween(3, 10), false);
      $title = Str::title(Str::replace('-', ' ', $slug));
      $content = fakeHtml();
      $cover = '';

      if ($savepics) {
        $cover =
          '/storage/images/' .
          fake()->image(
            dir: storage_path('app/public/images'),
            width: $cover_width,
            height: $cover_height,
            isFullPath: false,
          );
      } else {
        $cover = fake()->imageUrl(width: $cover_width, height: $cover_height);
      }

      $status = getTrueOrFalse() ? 'publish' : 'draft';
      $view = fake()->numberBetween(1, 999);
      $like = fake()->numberBetween(1, 999);
      $tags = fakeTerms((int) $this->option('tagscount'));
      $categories = fakeTerms((int) $this->option('categoriescount'));
      $created_at = fakeTimeStamp();
      $updated_at = getTrueOrFalse()
        ? $created_at
        : Carbon::parse($created_at)->addYears(fake()->numberBetween(1, 3));

      array_push($posts, [
        'title' => $title,
        'slug' => $slug,
        'view' => $view,
        'like' => $like,
        'content' => $content,
        'cover' => $cover,
        'status' => $status,
        'tags' => $tags,
        'categories' => $categories,
        'created_at' => $created_at->format('Y-m-d H:i:s'),
        'updated_at' => $updated_at->format('Y-m-d H:i:s'),
      ]);
      $bar->advance();
    }

    putJson(disk: 'public', path: 'fake/posts', arr: $posts, append: $append);
    $bar->finish();
    $this->newLine();
    $this->info('Fake posts generated.');
  }
}
