import type { ComboboxItem } from '@mantine/core';

export const gParentCategories = (count: number): ComboboxItem[] => {
  return Array(count)
    .fill(0)
    .map((_, index) => ({ value: `${index}`, label: `Option ${index}` }));
};

export default gParentCategories;
