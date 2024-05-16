import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './CardImageBG2.module.css';

export function CardImageBG2({ h }: { h?: string }) {
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card} h={h}>
      <div>
        <Text className={classes.category} size="xs">
          nature
        </Text>
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
