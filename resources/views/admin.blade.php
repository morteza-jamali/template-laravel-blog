<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ config('app.name') }}</title>
  <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />

  @viteReactRefresh
  @vite('resources/react/app.tsx')
</head>

<body>
  <div id="root"></div>
</body>

</html>

{{-- @extends('layout')

@section('title', 'Admin | New Post')

@section('content')

  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center pb-3">Create new post</h5>
          <form method="post" action="{{ route('admin') }}">
            @csrf

            @if ($errors->any())
              @include('partials.error')
            @endif

            <div class="row g-3">
              <div class="col-md-12">
                <label for="titleFormControlInput" class="form-label">Title</label>
                <input type="text" name="title" value="{{ old('title') }}" class="form-control"
                  id="titleFormControlInput" placeholder="Post title" minlength="5" maxlength="100" required>
              </div>
              <div class="col-md-12">
                <label for="contentFormControlTextarea" class="form-label">Content</label>
                <textarea class="form-control" name="content" id="contentFormControlTextarea" rows="3" placeholder="Post content"
                  minlength="5" maxlength="2000" required>{{ old('content') }}</textarea>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Publish</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

@endsection --}}
