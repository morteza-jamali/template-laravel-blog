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
import classes from './PostHeader.module.css';

export interface PostHeaderProps extends ContainerProps {}

export function PostHeader({ ...rest }: PostHeaderProps) {
  return (
    <Container size="lg" {...rest}>
      <Card p={0} radius={0}>
        <Group wrap="nowrap" gap={0} justify="space-between" grow>
          <div className={classes.body}>
            <Badge tt="uppercase" size="lg">
              technology
            </Badge>
            <Title mt="lg" mb="lg">
              The best laptop for Frontend engineers in 2022
            </Title>
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
              <Text size="xs" c="dimmed">
                Feb 6th
              </Text>
            </Group>
          </div>
          <div>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
            />
          </div>
        </Group>
      </Card>
    </Container>
  );
}

export default PostHeader;
