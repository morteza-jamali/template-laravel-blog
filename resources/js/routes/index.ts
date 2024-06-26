export const ROUTES = {
  DASHBOARD: {
    HOME: '/dashboard',
    POST: {
      NEW: '/dashboard/post/new',
      ALL: '/dashboard/post/all',
      EDIT: '/dashboard/post/edit',
      PREVIEW: '/dashboard/post/preview',
    },
    CATEGORY: {
      NEW: '/dashboard/category/new',
      ALL: '/dashboard/category/all',
      EDIT: '/dashboard/category/edit',
    },
    TAG: {
      NEW: '/dashboard/tag/new',
      ALL: '/dashboard/tag/all',
      EDIT: '/dashboard/tag/edit',
    },
  },
  BLOG: {
    CATEGORY: {
      SINGLE: '/category',
      ALL: '/categories',
    },
    POST: {
      SINGLE: '/post',
      ALL: '/posts',
    },
    TAG: {
      SINGLE: '/tag',
      ALL: '/tags',
    },
  },
};

export default ROUTES;
