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
}

function Btn({ type }: BtnProps) {
  const isNext = type === 'next';
  const isPrev = type === 'prev';

  return (
    <UnstyledButton component={Link} href="#">
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          {isPrev ? <IconChevronLeft size={16} /> : null}
          <Text fw={700}>Next Post</Text>
          {isNext ? <IconChevronRight size={16} /> : null}
        </Group>
        <Text>
          Build fully functional accessible web applications faster than ever
        </Text>
      </Stack>
    </UnstyledButton>
  );
}

export interface NexPrevPostProps extends MantineStyleProps {}

export function NexPrevPost(props: NexPrevPostProps) {
  return (
    <Group
      justify="space-between"
      preventGrowOverflow={false}
      grow
      gap="lg"
      wrap="nowrap"
      {...props}
    >
      <Btn type="prev" />
      <Divider orientation="vertical" />
      <Btn type="next" />
    </Group>
  );
}

export default NexPrevPost;
