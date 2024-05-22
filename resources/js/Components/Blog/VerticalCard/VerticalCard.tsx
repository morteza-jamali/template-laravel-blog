import { Card, Image, Avatar, Text, Group } from '@mantine/core';
import { type Post } from '@/types';
import classes from './VerticalCard.module.css';

export interface VerticalCardProps extends Partial<Post> {}

export function VerticalCard({
  categories,
  title,
  created_at,
  cover,
}: VerticalCardProps) {
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image src={cover} height={160} />
        <div className={classes.body}>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            technology
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
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
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default VerticalCard;
