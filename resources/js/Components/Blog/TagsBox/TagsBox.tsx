import { Anchor, Card, Group, Badge, Title } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { type Tag } from '@/types';
import ROUTES from '@/routes';

export interface TagsBoxProps {
  data: Array<Tag>;
}

export function TagsBox({ data }: TagsBoxProps) {
  return (
    <Card withBorder radius="md">
      <Group justify="space-between">
        <Title order={4}>Top Tags</Title>
        <Anchor
          size="xs"
          c="dimmed"
          style={{ lineHeight: 1 }}
          component={Link}
          href={ROUTES.BLOG.TAG.ALL}
        >
          See All Tags
        </Anchor>
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
