import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import {
  Card,
  Text,
  Group,
  Center,
  rem,
  useMantineTheme,
  type CardProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import ROUTES from '@/routes';
import classes from './CardImageBG.module.css';
import { type CompletePost } from '@/types';

export interface CardImageBGProps extends CardProps {
  post: CompletePost;
}

export function CardImageBG({ post, ...rest }: CardImageBGProps) {
  const theme = useMantineTheme();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component={Link}
      href={`${ROUTES.BLOG.POST.SINGLE}/${post.id}`}
      {...rest}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${post.cover})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {post.title}
          </Text>

          <Group justify="space-between" gap="xs">
            <Group>
              {post.categories.map((category) => (
                <Text
                  size="sm"
                  component={Link}
                  href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
                  className={classes.author}
                  key={category.slug}
                >
                  {category.name}
                </Text>
              ))}
            </Group>

            <Group gap="lg">
              <Center>
                <IconEye
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  7847
                </Text>
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  5
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default CardImageBG;
