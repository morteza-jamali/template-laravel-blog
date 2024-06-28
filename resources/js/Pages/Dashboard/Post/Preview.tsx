import ROUTES from '@/routes';
import { router } from '@inertiajs/react';

export const PreviewPost = () => {
  const url = new URL(window.location.href);
  const preview_id = url.searchParams.get('id');

  if (!preview_id) {
    router.visit(ROUTES.DASHBOARD.POST.NEW);

    return;
  }

  const storage_data = localStorage.getItem(preview_id as string);

  if (!storage_data) {
    router.visit(ROUTES.DASHBOARD.POST.NEW);

    return;
  }

  const data = JSON.parse(storage_data as string);

  router.post(ROUTES.DASHBOARD.POST.PREVIEW, data, {
    onFinish: () => localStorage.removeItem(preview_id as string),
  });
};

export default PreviewPost;
