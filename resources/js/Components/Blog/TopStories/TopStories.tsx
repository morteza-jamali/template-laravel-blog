import {
  Button,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { CardImageBG, CardImageBGProps } from '@/Components/Blog';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export interface TopStoriesProps {
  data: Array<CardImageBGProps['post']>;
}

export function TopStories({ data }: TopStoriesProps) {
  return (
    <Container my="md" size="lg">
      <Stack>
        <Group justify="space-between">
          <Title order={2}>Top stories</Title>
          <Button
            variant="transparent"
            component={Link}
            href="#"
            rightSection={<IconArrowRight size={14} />}
          >
            All Top Stories
          </Button>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <CardImageBG size="md" post={data[0]} />
          <Grid gutter="md">
            <Grid.Col>
              <CardImageBG size="sm" post={data[1]} />
            </Grid.Col>
            <Grid.Col>
              <CardImageBG size="sm" post={data[2]} />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default TopStories;
