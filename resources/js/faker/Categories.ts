import { faker } from '@faker-js/faker';

export function generateCategories(count?: number) {
  return [...Array(!count || count < 1 ? 50 : count)].map((_, index) => ({
    id: index + 1,
    title: faker.lorem.text(),
    count: faker.number.int(600),
  }));
}

export default generateCategories;
