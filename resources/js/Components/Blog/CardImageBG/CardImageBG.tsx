import {
  Paper,
  Text,
  Title,
  Button,
  Group,
  rem,
  type PaperProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import ROUTES from '@/routes';
import { type CompletePost } from '@/types';
import classes from './CardImageBG.module.css';

export interface CardImageBGProps extends PaperProps {
  size: 'md' | 'sm';
  post: CompletePost;
}

const PRIMARY_COL_HEIGHT = rem(500);
const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

export function CardImageBG({ size, post, ...rest }: CardImageBGProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      style={{ backgroundImage: `url(${post.cover})` }}
      h={size === 'md' ? PRIMARY_COL_HEIGHT : SECONDARY_COL_HEIGHT}
      {...rest}
    >
      <div>
        <Group>
          {post.categories.map((category) => (
            <Text
              component={Link}
              href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
              className={classes.category}
              size="xs"
              key={category.slug}
            >
              {category.name}
            </Text>
          ))}
        </Group>
        <Title
          order={3}
          className={classes.title}
          style={{ fontSize: rem(size === 'sm' ? 20 : 32) }}
        >
          {post.title}
        </Title>
      </div>
      <Button
        variant="white"
        color="dark"
        component={Link}
        href={`${ROUTES.BLOG.POST.SINGLE}/${post.id}`}
        ml="auto"
      >
        Read story
      </Button>
    </Paper>
  );
}

export default CardImageBG;
