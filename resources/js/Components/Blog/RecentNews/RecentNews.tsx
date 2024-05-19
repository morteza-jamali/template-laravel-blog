import {
  Button,
  Container,
  Group,
  Grid,
  Stack,
  Title,
  Space,
} from '@mantine/core';
import {
  AdBanner,
  CategoriesBox,
  Subscribe,
  VerticalCard,
} from '@/Components/Blog';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export function RecentNews() {
  return (
    <Container size="lg">
      <Grid gutter="xl">
        <Grid.Col span="auto">
          <Stack>
            <AdBanner type="H1" />
            <Space />
            <Group justify="space-between">
              <Title order={2}>Recent stories</Title>
              <Button
                variant="transparent"
                component={Link}
                href="#"
                rightSection={<IconArrowRight size={14} />}
              >
                All Recent Stories
              </Button>
            </Group>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <VerticalCard key={index} />
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            <CategoriesBox />
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default RecentNews;
