<div class="row row-cols-md-3 g-4">
  @foreach ($posts as $post)
    <div class="col">
      <div class="card h-100 border-info">
        <div class="card-header">
          <h5 class="card-title">{{ Str::limit($post->content, 50, '...') }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">{!! nl2br(e(Str::limit($post->content, 100, '...'))) !!}</p>
          <a href="{{ route('show', [$post->id]) }}" class="stretched-link"></a>
        </div>
        <div class="card-footer">
          <small>Posted: {{ $post->created_at->diffForHumans() }}</small>
        </div>
      </div>
    </div>
  @endforeach
</div>
