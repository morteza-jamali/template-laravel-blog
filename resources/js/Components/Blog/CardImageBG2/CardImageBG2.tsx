import { Paper, Text, Title, Button, type PaperProps } from '@mantine/core';
import { type CompletePost } from '@/types';
import classes from './CardImageBG2.module.css';

export interface CardImageBG2Props extends PaperProps {
  post: CompletePost;
}

export function CardImageBG2({ post, ...rest }: CardImageBG2Props) {
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card} {...rest}>
      <div>
        {post.categories.map((category) => (
          <Text className={classes.category} size="xs" key={category.slug}>
            {category.name}
          </Text>
        ))}
        <Title order={3} className={classes.title}>
          Best forests to visit in North America
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

export default CardImageBG2;
