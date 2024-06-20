import {
  Paper,
  Text,
  Title,
  Button,
  Group,
  type PaperProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import ROUTES from '@/routes';
import { type CompletePost } from '@/types';
import classes from './CardImageBG2.module.css';

export interface CardImageBG2Props extends PaperProps {
  post: CompletePost;
}

export function CardImageBG2({ post, ...rest }: CardImageBG2Props) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      style={{ backgroundImage: `url(${post.cover})` }}
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
        <Title order={3} className={classes.title}>
          {post.title}
        </Title>
      </div>
      <Button
        variant="white"
        color="dark"
        component={Link}
        href={`${ROUTES.BLOG.POST.SINGLE}/${post.id}`}
      >
        Read story
      </Button>
    </Paper>
  );
}

export default CardImageBG2;
