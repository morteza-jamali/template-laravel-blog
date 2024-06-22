import { Anchor, Card, Group, Badge, Title } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { type Tag } from '@/types';
import ROUTES from '@/routes';

export interface TagsBoxProps {
  data: Array<Tag>;
  title?: string;
  link?:
    | false
    | {
        title: string;
        href: string;
      };
}

export function TagsBox({ data, title, link }: TagsBoxProps) {
  return (
    <Card withBorder radius="md">
      <Group justify="space-between">
        <Title order={4}>{title ?? 'Top Tags'}</Title>
        {link !== false ? (
          <Anchor
            size="xs"
            c="dimmed"
            style={{ lineHeight: 1 }}
            component={Link}
            href={link ? link.href : ROUTES.BLOG.TAG.ALL}
          >
            {link ? link.title : 'See All Tags'}
          </Anchor>
        ) : null}
      </Group>
      <Group mt="lg" gap="xs">
        {data.map(({ id, slug, name }) => (
          <Badge
            radius="xs"
            variant="dot"
            key={slug}
            component={Link}
            style={{ cursor: 'pointer' }}
            href={`${ROUTES.BLOG.TAG.SINGLE}/${id}`}
          >
            {name}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}

export default TagsBox;
