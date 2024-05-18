import { VerticalCard } from '@/Components/Blog';
import {
  Container,
  Group,
  SimpleGrid,
  Stack,
  Title,
  Button,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconArrowRight } from '@tabler/icons-react';

export function TrendingStories() {
  return (
    <Container size="lg" my={100}>
      <Stack>
        <Group justify="space-between">
          <Title order={2}>Trending stories</Title>
          <Button
            variant="transparent"
            component={Link}
            href="#"
            rightSection={<IconArrowRight size={14} />}
          >
            All Trending Stories
          </Button>
        </Group>
        <SimpleGrid cols={2} verticalSpacing="lg">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <VerticalCard key={index} />
            ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default TrendingStories;
