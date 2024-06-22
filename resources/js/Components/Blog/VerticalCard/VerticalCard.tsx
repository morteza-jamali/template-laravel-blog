import { Card, Image, Avatar, Text, Group, Badge } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconHeart, IconEye } from '@tabler/icons-react';
import { type CompletePost, type RequiredBy } from '@/types';
import classes from './VerticalCard.module.css';
import ROUTES from '@/routes';

export interface VerticalCardProps {
  data: RequiredBy<CompletePost, 'title' | 'id'>;
}

export function VerticalCard({ data }: VerticalCardProps) {
  return (
    <Card withBorder radius="md" p={0} className={classes.card} shadow="sm">
      <Group wrap="nowrap" gap={0}>
        <Image src={data?.cover} height={160} />
        <div className={classes.body}>
          <Group gap="xs">
            {data?.categories
              ? data.categories.map((category) => (
                  <Badge
                    component={Link}
                    href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
                    className={classes.badge}
                    key={category.slug}
                  >
                    {category.name}
                  </Badge>
                ))
              : null}
          </Group>
          <Text
            className={classes.title}
            component={Link}
            href={`${ROUTES.BLOG.POST.SINGLE}/${data.id}`}
            mt="xs"
            mb="md"
          >
            {data.title}
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
            {data?.created_at ? (
              <Text size="xs" c="dimmed">
                {data?.created_at}
              </Text>
            ) : null}
            {data?.like ? (
              <Badge
                variant="transparent"
                color="gray"
                leftSection={<IconHeart size={14} />}
              >
                {data?.like}
              </Badge>
            ) : null}
            {data?.view ? (
              <Badge
                variant="transparent"
                color="gray"
                leftSection={<IconEye size={14} />}
              >
                {data?.view}
              </Badge>
            ) : null}
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default VerticalCard;
