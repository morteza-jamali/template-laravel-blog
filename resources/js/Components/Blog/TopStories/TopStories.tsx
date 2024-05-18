import {
  Button,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Title,
  rem,
} from '@mantine/core';
import { CardImageBG, CardImageBG2 } from '@/Components/Blog';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

const PRIMARY_COL_HEIGHT = rem(500);

export function TopStories() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

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
          <CardImageBG2 h={PRIMARY_COL_HEIGHT} />
          <Grid gutter="md">
            <Grid.Col>
              <CardImageBG h={SECONDARY_COL_HEIGHT} />
            </Grid.Col>
            <Grid.Col>
              <CardImageBG h={SECONDARY_COL_HEIGHT} />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default TopStories;
