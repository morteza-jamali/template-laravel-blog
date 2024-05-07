import type { ComboboxItem } from '@mantine/core';

export const gParentCategories = (count: number): ComboboxItem[] => {
  return Array(count)
    .fill(0)
    .map((_, index) => ({ value: `${index + 1}`, label: `Option ${index}` }));
};

export default gParentCategories;
