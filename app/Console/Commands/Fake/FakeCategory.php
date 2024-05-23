<?php

namespace App\Console\Commands\Fake;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Console\Isolatable;

class FakeCategory extends Command implements Isolatable
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'fake:category
                          {--C|count=50 : Fake categories count}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate fake categories';

  private function getTrueOrFalse(?int $length = 2)
  {
    if (fake()->numberBetween(0, $length) === $length - 1) {
      return true;
    }

    return false;
  }

  private function fakeTimeStamp()
  {
    return Carbon::createFromFormat(
      'Y-m-d H:i:s',
      fake()->date('Y-m-d') . ' ' . fake()->time('H:i:s'),
    );
  }

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

    $categories = [];

    foreach (array_fill(0, $count, 0) as $_) {
      $slug = fake()->slug(3, false);
      $name = Str::title(Str::replace('-', ' ', $slug));
      $description = $this->getTrueOrFalse() ? fake()->text() : null;
      $count = $this->getTrueOrFalse() ? fake()->randomNumber(4) : 0;
      $created_at = $this->fakeTimeStamp();
      $updated_at = Carbon::parse($created_at)->addYears(
        fake()->numberBetween(1, 3),
      );

      // TODO: seed `parent` column
      array_push($categories, [
        'name' => $name,
        'slug' => $slug,
        'description' => $description,
        'count' => $count,
        'created_at' => $created_at->format('Y-m-d H:i:s'),
        'updated_at' => $updated_at->format('Y-m-d H:i:s'),
      ]);
    }

    Storage::disk('public')->put(
      'fake/categories.json',
      json_encode($categories),
    );
  }
}
