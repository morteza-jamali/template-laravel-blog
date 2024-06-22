import { VerticalCard, type VerticalCardProps } from '@/Components/Blog';
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

export interface TrendingStoriesProps {
  data: Array<VerticalCardProps['data']>;
}

export function TrendingStories({ data }: TrendingStoriesProps) {
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
          {data.map(({ like, created_at, ...post }) => (
            <VerticalCard data={post} key={post.slug} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default TrendingStories;
