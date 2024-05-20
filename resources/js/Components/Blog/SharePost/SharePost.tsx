import { ActionIcon, Button, Group, Stack, Text, Tooltip } from '@mantine/core';
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
} from '@tabler/icons-react';

const ITEMS = [
  { icon: IconBrandX, follower: '2K+', color: 'black', label: 'X' },
  {
    icon: IconBrandFacebook,
    follower: '4K+',
    color: 'blue',
    label: 'Facebook',
  },
  {
    icon: IconBrandInstagram,
    follower: '66K+',
    color: 'purple',
    label: 'Instagram',
  },
  {
    icon: IconBrandPinterest,
    follower: '1K+',
    color: 'red',
    label: 'Pinterest',
  },
];

export interface SharePostProps {
  type?: 'horizontal' | 'vertical';
}

interface ItemsProps extends SharePostProps {}

function Items({ type }: ItemsProps) {
  return (
    <>
      {ITEMS.map((item, index) =>
        type === 'horizontal' ? (
          <Tooltip label={item.label} withArrow key={index}>
            <Button
              leftSection={<item.icon size={16} />}
              color={item.color}
              variant="filled"
            >
              {item.follower}
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label={item.label} withArrow position="right" key={index}>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="lg"
              color={item.color}
            >
              <item.icon size={16} />
            </ActionIcon>
          </Tooltip>
        ),
      )}
    </>
  );
}

export function SharePost({ type }: SharePostProps) {
  type = type ?? 'horizontal';

  if (type === 'vertical') {
    return (
      <Stack>
        <Items type={type} />
      </Stack>
    );
  }

  return (
    <Group gap="xs">
      <Text fw={700}>Share:</Text>
      <Items type={type} />
    </Group>
  );
}

export default SharePost;
