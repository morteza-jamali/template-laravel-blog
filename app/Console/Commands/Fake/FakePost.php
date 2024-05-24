<?php

namespace App\Console\Commands\Fake;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
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
                            {--T|tagscount=50 : Maximum tags count}
                            {--K|categoriescount=50 : Maximum categories count}
                            {--S|savepics : Whether to save pictures or not}
                            {--C|count=50 : Fake posts count}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate fake posts';

  private function fakeHtml()
  {
    $length = getTrueOrFalse() ? 'long' : 'short';

    return Http::get(
      "https://loripsum.net/api/10/$length/decorate/link/ul/dl/ol/bq/code/headers",
    )->body();
  }

  private function fakeTerms(int $max_count)
  {
    return implode(',', fake()->randomElements(range(1, $max_count), null));
  }

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
    $count = (int) $this->option('count');
    $cover_width = fake()->numberBetween(3, 9) * 100;
    $cover_height = fake()->numberBetween(3, 6) * 100;
    $bar = $this->output->createProgressBar($count);

    foreach (array_fill(0, $count, 0) as $_) {
      $slug = fake()->slug(fake()->numberBetween(3, 10), false);
      $title = Str::title(Str::replace('-', ' ', $slug));
      $content = $this->fakeHtml();
      $cover = '';

      if ($this->option('savepics')) {
        Storage::disk('public')->makeDirectory('images');

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
      $tags = $this->fakeTerms((int) $this->option('tagscount'));
      $categories = $this->fakeTerms((int) $this->option('categoriescount'));
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

    putJson(disk: 'public', path: 'fake/posts', arr: $posts);
    $bar->finish();
    echo PHP_EOL;
  }
}
