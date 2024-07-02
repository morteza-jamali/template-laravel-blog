import {
  ParentLayout,
  MainSection,
  PostHeader,
  PostAuthor,
  SharePost,
  PostContent,
  NexPrevPost,
  type NexPrevPostProps,
} from '@/Components/Blog';
import { type CompletePost } from '@/types';
import { Group } from '@mantine/core';

interface SinglePostProps {
  post: CompletePost;
  liked?: boolean;
  previous_post?: NexPrevPostProps['data']['previous_post'];
  next_post?: NexPrevPostProps['data']['next_post'];
}

export function SinglePost({
  liked,
  post,
  next_post,
  previous_post,
}: SinglePostProps) {
  const { content, tags, ...header } = post;

  return (
    <ParentLayout title={header.title}>
      <PostHeader mb={60} data={{ liked, post: header }} />
      <MainSection
        tags={tags ? { data: tags, title: 'Tags', link: false } : undefined}
      >
        <Group
          justify="space-between"
          wrap="nowrap"
          align="flex-start"
          gap="xl"
        >
          <SharePost
            type="vertical"
            ml="calc(var(--group-gap, var(--mantine-spacing-md)) * -2)"
          />
          <PostContent content={content} />
        </Group>
        <SharePost mb="xl" mt="calc(var(--mantine-spacing-xl) * 2)" />
        <PostAuthor />
        {next_post || previous_post ? (
          <NexPrevPost
            data={{ next_post, previous_post }}
            my="calc(var(--mantine-spacing-xl) * 3)"
          />
        ) : null}
      </MainSection>
    </ParentLayout>
  );
}

export default SinglePost;
