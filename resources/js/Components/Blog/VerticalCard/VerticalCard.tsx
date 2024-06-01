import { Card, Image, Avatar, Text, Group, Badge } from '@mantine/core';
import { IconHeart, IconEye } from '@tabler/icons-react';
import { type Post } from '@/types';
import classes from './VerticalCard.module.css';

export interface VerticalCardProps extends Partial<Post> {}

export function VerticalCard({
  categories,
  title,
  created_at,
  cover,
  view,
  like,
}: VerticalCardProps) {
  return (
    <Card withBorder radius="md" p={0} className={classes.card} shadow="sm">
      <Group wrap="nowrap" gap={0}>
        <Image src={cover} height={160} />
        <div className={classes.body}>
          <Badge component="a" href="#" className={classes.badge}>
            technology
          </Badge>
          <Text
            className={classes.title}
            component="a"
            href="#"
            mt="xs"
            mb="md"
          >
            {title}
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={20}
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              />
              <Text size="xs">Elsa Typechecker</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {created_at}
            </Text>
            <Badge
              variant="transparent"
              color="gray"
              leftSection={<IconHeart size={14} />}
            >
              {like}
            </Badge>
            <Badge
              variant="transparent"
              color="gray"
              leftSection={<IconEye size={14} />}
            >
              {view}
            </Badge>
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default VerticalCard;
