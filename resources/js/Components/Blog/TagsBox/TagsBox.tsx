import { Anchor, Card, Group, Pill, Title } from '@mantine/core';

const mockdata = [
  { label: 'first', id: '2' },
  { label: 'second', id: '2' },
  { label: 'apple', id: '2' },
  { label: 'nice', id: '2' },
  { label: 'ppp', id: '2' },
  { label: 'gdfg', id: '2' },
  { label: 'kojd', id: '2' },
  { label: 'lolo', id: '2' },
  { label: 'purple', id: '2' },
];

export function TagsBox() {
  return (
    <Card withBorder radius="md">
      <Group justify="space-between">
        <Title order={4}>Top Tags</Title>
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
          See All Tags
        </Anchor>
      </Group>
      <Pill.Group mt="lg">
        {mockdata.map((item) => (
          <Pill radius={0} key={item.label}>
            {item.label}
          </Pill>
        ))}
      </Pill.Group>
    </Card>
  );
}

export default TagsBox;
