import {
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Container,
  Title,
  Badge,
  type ContainerProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconCalendar } from '@tabler/icons-react';
import { type CompletePost } from '@/types';
import classes from './PostHeader.module.css';
import ROUTES from '@/routes';

export interface PostHeaderProps extends ContainerProps {
  data: Pick<CompletePost, 'categories' | 'title' | 'cover' | 'created_at'>;
}

export function PostHeader({ data, ...rest }: PostHeaderProps) {
  return (
    <Container size="lg" {...rest}>
      <Card p={0} radius={0}>
        <Group wrap="nowrap" gap={0} justify="space-between" grow>
          <div className={classes.body}>
            <Group gap="sm">
              {data.categories.map((category) => (
                <Badge
                  style={{ cursor: 'pointer' }}
                  tt="uppercase"
                  component={Link}
                  href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
                  size="lg"
                  key={category.slug}
                >
                  {category.name}
                </Badge>
              ))}
            </Group>
            <Title mt="lg" mb="lg">
              {data.title}
            </Title>
            <Group wrap="nowrap" gap="xs" align="center">
              <Group gap={2} wrap="nowrap">
                <Avatar size="sm" />
                <Text size="xs">Admin</Text>
              </Group>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Badge
                variant="transparent"
                color="gray"
                leftSection={<IconCalendar size={18} />}
                size="lg"
              >
                {data.created_at}
              </Badge>
            </Group>
          </div>
          {data.cover ? (
            <div>
              <Image radius="md" src={data.cover} mah={400} />
            </div>
          ) : null}
        </Group>
      </Card>
    </Container>
  );
}

export default PostHeader;
