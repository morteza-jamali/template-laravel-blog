<?php

namespace App\Console\Commands\Fake;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Contracts\Console\Isolatable;

class FakeTag extends Command implements Isolatable
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'fake:tag
                          {--A|append : Append new data}
                          {--C|count=50 : Fake tags count}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate fake tags';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $count = (int) $this->option('count');

    if ($count < 1) {
      $this->error('Count should be greater than 0');

      return 1;
    }

    $tags = [];

    foreach (array_fill(0, $count, 0) as $_) {
      $slug = fake()->slug(3, false);
      $name = Str::title(Str::replace('-', ' ', $slug));
      $description = getTrueOrFalse() ? fake()->text() : null;
      $count = getTrueOrFalse() ? fake()->randomNumber(4) : 0;
      $created_at = fakeTimeStamp();
      $updated_at = getTrueOrFalse()
        ? $created_at
        : Carbon::parse($created_at)->addYears(fake()->numberBetween(1, 3));

      array_push($tags, [
        'name' => $name,
        'slug' => $slug,
        'description' => $description,
        'count' => $count,
        'created_at' => $created_at->format('Y-m-d H:i:s'),
        'updated_at' => $updated_at->format('Y-m-d H:i:s'),
      ]);
    }

    putJson(
      disk: 'public',
      path: 'fake/tags',
      arr: $tags,
      append: $this->option('append'),
    );
    $this->info('Fake tags generated.');
  }
}
