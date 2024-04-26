@extends('layout')
@section('title', $post->title)

@section('content')

  <div class="card border-dark">
    <div class="card-header">{{ $post->title }}</div>
    <div class="card-body">
      <p class="card-text">{{ $post->content }}</p>
    </div>
  </div>

@endsection
