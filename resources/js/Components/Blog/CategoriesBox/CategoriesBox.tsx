import {
  Card,
  SimpleGrid,
  Anchor,
  Text,
  Group,
  Title,
  UnstyledButton,
} from '@mantine/core';
import classes from './CategoriesBox.module.css';

const mockdata = [
  { title: 'Credit cards' },
  { title: 'Banks nearby' },
  { title: 'Transfers' },
  { title: 'Refunds' },
  { title: 'Receipts' },
  { title: 'Taxes' },
  { title: 'Reports' },
  { title: 'Payments' },
  { title: 'Cashback' },
];

export function CategoriesBox() {
  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Title order={4}>Top Categories</Title>
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
          See All Categories
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}

export default CategoriesBox;
