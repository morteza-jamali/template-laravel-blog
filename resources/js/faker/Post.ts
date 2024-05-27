import { type Post } from '@/types';

export function gPosts(count?: number) {
  return import('#/storage/fake/posts.json').then(({ default: data }) => {
    const posts =
      count && count > 0 && count <= data.length ? data.slice(0, count) : data;

    return posts.map((post, id) => ({ id, ...post }) as unknown as Post);
  });
}

export default gPosts;
