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
import { Link, router } from '@inertiajs/react';
import { IconCalendar, IconEye } from '@tabler/icons-react';
import { Like } from '@/Components/Global';
import { type CompletePost } from '@/types';
import classes from './PostHeader.module.css';
import ROUTES from '@/routes';

export interface PostHeaderProps extends ContainerProps {
  data: { post: Omit<CompletePost, 'tags' | 'content'>; liked: boolean };
}

export function PostHeader({ data, ...rest }: PostHeaderProps) {
  const { post, liked } = data;

  const onLikeHandler = (value: number) => {
    router.post(
      `${ROUTES.BLOG.POST.SINGLE}/${post.id}`,
      {
        func: value > post.like ? 'increment' : 'decrement',
      } as unknown as FormData,
      {
        onError: (errs) => {
          console.log(`[DEBUG]: `, errs);
        },
      },
    );
  };

  return (
    <Container size="lg" {...rest}>
      <Card p={0} radius={0}>
        <Group wrap="nowrap" gap={0} justify="space-between" grow>
          <div className={classes.body}>
            <Group gap="sm">
              {post.categories.map((category) => (
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
              {post.title}
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
                {post.created_at}
              </Badge>
              <Badge
                variant="transparent"
                color="gray"
                leftSection={<IconEye size={18} />}
                size="lg"
              >
                {post.view}
              </Badge>
              <Like liked={liked} value={post.like} onClick={onLikeHandler} />
            </Group>
          </div>
          {post.cover ? (
            <div>
              <Image radius="md" src={post.cover} mah={400} />
            </div>
          ) : null}
        </Group>
      </Card>
    </Container>
  );
}

export default PostHeader;
