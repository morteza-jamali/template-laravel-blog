import { VerticalCard } from '@/Components/Blog';
import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Image,
  Badge,
  Button,
  Card,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './RecentNews.module.css';

export function RecentNews() {
  return (
    <Container size="lg" my={20}>
      <SimpleGrid cols={2} verticalSpacing="lg" spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section className={classes.section}>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
              className={classes.image}
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
        <Stack gap="lg">
          <Group justify="space-between">
            <Title order={2}>Recent News</Title>
            <Button
              variant="transparent"
              component={Link}
              href="#"
              rightSection={<IconArrowRight size={14} />}
            >
              All Recent News
            </Button>
          </Group>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <VerticalCard key={index} />
            ))}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default RecentNews;
