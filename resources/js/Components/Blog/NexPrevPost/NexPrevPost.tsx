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
          <Text fw={700}>Next Post</Text>
          {isNext ? <IconChevronRight size={16} /> : null}
        </Group>
        <Text>{data.title}</Text>
      </Stack>
    </UnstyledButton>
  );
}

export interface NexPrevPostProps extends MantineStyleProps {
  data: {
    next_post: BtnProps['data'];
    previous_post: BtnProps['data'];
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
      <Btn type="prev" data={previous_post} />
      <Divider orientation="vertical" />
      <Btn type="next" data={next_post} />
    </Group>
  );
}

export default NexPrevPost;
