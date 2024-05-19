import { Button, Group, Text } from '@mantine/core';
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
} from '@tabler/icons-react';

const ITEMS = [
  { icon: IconBrandX, follower: '2K+', color: 'black' },
  { icon: IconBrandFacebook, follower: '4K+', color: 'blue' },
  { icon: IconBrandInstagram, follower: '66K+', color: 'purple' },
  { icon: IconBrandPinterest, follower: '1K+', color: 'red' },
];

export function SharePost() {
  return (
    <Group gap="xs">
      <Text fw={700}>Share:</Text>
      {ITEMS.map((item, index) => (
        <Button
          leftSection={<item.icon size={16} />}
          key={index}
          color={item.color}
          variant="filled"
        >
          {item.follower}
        </Button>
      ))}
    </Group>
  );
}

export default SharePost;
