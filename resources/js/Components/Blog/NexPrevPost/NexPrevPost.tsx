import ROUTES from '@/routes';
import { type Post } from '@/types';
import { Link } from '@inertiajs/react';
import {
  Divider,
  Group,
  Stack,
  Text,
  UnstyledButton,
  type MantineStyleProps,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface BtnProps {
  type: 'prev' | 'next';
  data: Post;
}

function Btn({ type, data }: BtnProps) {
  const isNext = type === 'next';
  const isPrev = type === 'prev';

  return (
    <UnstyledButton
      component={Link}
      href={`${ROUTES.BLOG.POST.SINGLE}/${data.id}`}
    >
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          {isPrev ? <IconChevronLeft size={16} /> : null}
          <Text fw={700}>{isNext ? 'Next' : 'Previous'} Post</Text>
          {isNext ? <IconChevronRight size={16} /> : null}
        </Group>
        <Text>{data.title}</Text>
      </Stack>
    </UnstyledButton>
  );
}

export interface NexPrevPostProps extends MantineStyleProps {
  data: {
    next_post?: BtnProps['data'];
    previous_post?: BtnProps['data'];
  };
}

export function NexPrevPost({ data, ...rest }: NexPrevPostProps) {
  const { next_post, previous_post } = data;

  return (
    <Group
      justify="space-between"
      preventGrowOverflow={false}
      grow
      gap="lg"
      wrap="nowrap"
      {...rest}
    >
      {previous_post ? <Btn type="prev" data={previous_post} /> : null}
      <Divider orientation="vertical" />
      {next_post ? <Btn type="next" data={next_post} /> : null}
    </Group>
  );
}

export default NexPrevPost;
