import {
  Paper,
  Text,
  Button,
  Group,
  Badge,
  rem,
  type PaperProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconHeart } from '@tabler/icons-react';
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
            <Badge
              component={Link}
              href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
              variant="filled"
              color="gray"
              className={classes.category}
              size="sm"
              key={category.slug}
            >
              {category.name}
            </Badge>
          ))}
        </Group>
        <Text
          className={classes.title}
          style={{ fontSize: rem(size === 'sm' ? 20 : 32) }}
          variant="gradient"
          gradient={{ from: 'gray', to: 'white', deg: 360 }}
        >
          {post.title}
        </Text>
      </div>
      <Group justify="space-between" align="center" w="100%">
        <Badge
          variant="transparent"
          color="white"
          size="lg"
          leftSection={<IconHeart color="red" size={16} />}
        >
          {post.like}
        </Badge>
        <Button
          variant="white"
          color="dark"
          component={Link}
          href={`${ROUTES.BLOG.POST.SINGLE}/${post.id}`}
        >
          Read story
        </Button>
      </Group>
    </Paper>
  );
}

export default CardImageBG;
