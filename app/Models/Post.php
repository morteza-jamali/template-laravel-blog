<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  use HasFactory;

  protected $fillable = [
    'author',
    'view',
    'like',
    'title',
    'slug',
    'content',
    'cover',
    'status',
    'tags',
    'categories',
  ];
}
