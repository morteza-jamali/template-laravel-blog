@extends('layout')
@section('title', 'Home')

@section('content')

  @if (count($posts) == 0)
    <div class="card text-center p-5">
      <div class="card-body">
        <p class="card-text">There is no content :(</p>
        <a href="{{ route('admin') }}" class="btn btn-primary">Let's write a post</a>
      </div>
    </div>
  @else
    @include('partials.summary')
  @endif

@endsection
