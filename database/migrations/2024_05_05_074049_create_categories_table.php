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
    Schema::create('categories', function (Blueprint $table) {
      $table->id('ID');
      $table->text('category_name');
      $table->string('category_slug', 200)->unique();
      $table->longText('category_description');
      $table->bigInteger('category_parent')->unsigned()->default(0);
      $table->bigInteger('category_count')->unsigned()->default(0);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('categories');
  }
};
