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
      $table->id('ID');
      $table->bigInteger('post_author')->unsigned()->default(0);
      $table->text('post_title');
      $table->string('post_slug', 200)->unique();
      $table->longText('post_content');
      $table->text('post_cover');
      $table->string('post_status', 20)->default('publish');
      $table->dateTime('post_date');
      $table->dateTime('post_modified');
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
