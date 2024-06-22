import {
  Card,
  SimpleGrid,
  Anchor,
  Text,
  Group,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { Category } from '@/types';
import classes from './CategoriesBox.module.css';
import ROUTES from '@/routes';

export interface CategoriesBoxProps {
  data: Array<Category>;
  title?: string;
  link?: {
    title: string;
    href: string;
  };
}

export function CategoriesBox({ data, link, title }: CategoriesBoxProps) {
  const items = data.map(({ slug, name, id }) => (
    <UnstyledButton
      key={slug}
      component={Link}
      href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${id}`}
      className={classes.item}
    >
      <Text size="xs" mt={7}>
        {name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Title order={4}>{title ?? 'Top Categories'}</Title>
        <Anchor
          size="xs"
          component={Link}
          c="dimmed"
          style={{ lineHeight: 1 }}
          href={link ? link.href : ROUTES.BLOG.CATEGORY.ALL}
        >
          {link ? link.title : 'See All Categories'}
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}

export default CategoriesBox;
