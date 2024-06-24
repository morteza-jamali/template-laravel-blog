import {
  TopStories,
  TrendingStories,
  MainSection,
  EditorsPicks,
  AdBanner,
  VerticalCard,
  ParentLayout,
  type VerticalCardProps,
  type TopStoriesProps,
  type TrendingStoriesProps,
  type CategoriesBoxProps,
  type TagsBoxProps,
} from '@/Components/Blog';
import { Button, Group, Space, Stack, Title } from '@mantine/core';
import { Link } from '@inertiajs/react';
import { IconArrowRight } from '@tabler/icons-react';

interface HomeProps {
  top_posts: TopStoriesProps['data'];
  trending_posts: TrendingStoriesProps['data'];
  top_categories: CategoriesBoxProps['data'];
  top_tags: TagsBoxProps['data'];
  recent_posts: Array<VerticalCardProps['data']>;
}

export const Home = ({
  top_posts,
  trending_posts,
  top_categories,
  top_tags,
  recent_posts,
}: HomeProps) => {
  return (
    <ParentLayout title="Home">
      <EditorsPicks />
      <TopStories data={top_posts} />
      <TrendingStories data={trending_posts} />
      <MainSection
        categories={{ data: top_categories }}
        tags={{ data: top_tags }}
      >
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
          {recent_posts.map((post) => (
            <VerticalCard data={post} key={post.slug} />
          ))}
        </Stack>
      </MainSection>
    </ParentLayout>
  );
};

export default Home;
