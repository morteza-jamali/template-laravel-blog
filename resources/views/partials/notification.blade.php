<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div class="toast text-bg-primary align-items-center" id="liveToast" role="alert" aria-live="assertive"
    aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ session('notification') }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
        aria-label="Close"></button>
    </div>
  </div>
</div>

<script>
  const toastLiveExample = document.getElementById('liveToast')

  bootstrap.Toast.getOrCreateInstance(toastLiveExample).show()
</script>
