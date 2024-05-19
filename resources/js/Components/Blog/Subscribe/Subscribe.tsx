import { Text, TextInput, Button, Avatar } from '@mantine/core';
import { IconNews } from '@tabler/icons-react';
import classes from './Subscribe.module.css';

export function Subscribe() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Avatar color="blue" size="xl" radius="xl">
          <IconNews size={50} />
        </Avatar>
        <Text fw={500} fz="lg" mb={5} className={classes.title}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed">
          You will never miss important product updates, latest news and
          community QA sessions. Our newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
