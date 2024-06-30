<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('posts', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('author')->unsigned()->default(0);
      $table->bigInteger('view')->unsigned()->default(0);
      $table->bigInteger('like')->unsigned()->default(0);
      $table->text('title');
      $table->string('slug', 200)->unique();
      $table->longText('content')->nullable();
      $table->longText('categories');
      $table->longText('tags')->nullable();
      $table->text('cover')->nullable();
      $table->string('status', 20)->default('publish');
      $table->timestampsTz();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('posts');
  }
};
