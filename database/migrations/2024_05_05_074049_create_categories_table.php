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
      $table->text('name');
      $table->string('slug', 200)->unique();
      $table->longText('description')->nullable();
      $table->bigInteger('parent')->unsigned()->default(0);
      $table->bigInteger('count')->unsigned()->default(0);
      $table->timestampsTz();
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
