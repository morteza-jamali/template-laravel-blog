import {
  TopStories,
  TrendingStories,
  MainSection,
  EditorsPicks,
  AdBanner,
  VerticalCard,
  ParentLayout,
} from '@/Components/Blog';
import { Button, Group, Space, Stack, Title } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconArrowRight } from '@tabler/icons-react';

export const Home = () => {
  return (
    <ParentLayout title="Home">
      <EditorsPicks />
      <TopStories />
      <TrendingStories />
      <MainSection>
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
      </MainSection>
    </ParentLayout>
  );
};

export default Home;
