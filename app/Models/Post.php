<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  use HasFactory;
  protected $fillable = [
    'post_author',
    'post_title',
    'post_slug',
    'post_content',
    'post_cover',
    'post_status',
    'post_date',
    'post_modified',
  ];

  public $timestamps = false;
}
