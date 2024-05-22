import { faker } from '@faker-js/faker';
import { type Post } from '@/types';
import { range } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const TOTAL_CATEGORIES_COUNT = 50;
const TOTAL_TAGS_COUNT = 50;

export function gPosts(count?: number) {
  return [...Array(!count || count < 1 ? 50 : count)].map((_, index) => {
    const id = index + 1;
    const slug = faker.lorem.slug({ min: 3, max: 10 });
    const title = slug.replaceAll('-', ' ');
    const author = faker.number.int({ min: 1, max: 200 });
    const content = faker.lorem.paragraphs(); // TODO: generate HTML content
    const categories = faker.helpers
      .arrayElements(range(1, TOTAL_CATEGORIES_COUNT), {
        min: 1,
        max: 5,
      })
      .join(',');
    const tags = faker.helpers
      .arrayElements(range(1, TOTAL_TAGS_COUNT), {
        min: 1,
        max: 10,
      })
      .join(',');
    const cover = (() => {
      const width = faker.number.int({ min: 3, max: 9 });
      const height = faker.number.int({ min: 3, max: 6 });

      return `https://picsum.photos/${width}00/${height}00?random=${uuidv4()}`;
    })();
    const status = 'publish';
    const created_at = faker.date.anytime().toString();
    const updated_at = faker.date.anytime().toString(); // TODO: 'updated_at' should be after 'created_at'

    const post: Post = {
      id,
      title,
      slug,
      author,
      content,
      categories,
      tags,
      cover,
      status,
      created_at,
      updated_at,
    };

    return post;
  });
}

export default gPosts;
