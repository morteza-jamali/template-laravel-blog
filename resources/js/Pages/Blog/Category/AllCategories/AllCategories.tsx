import { useState, useEffect } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  type CardTableProps,
} from '@/Components/Blog';
import { type Category } from '@/types';
import { IconArticle, IconCalendarTime } from '@tabler/icons-react';
import { importData } from '@/faker/helpers';
import {
  Container,
  Title,
  Card as MCard,
  Stack,
  Text,
  Group,
  Badge,
} from '@mantine/core';
import classes from './AllCategories.module.css';

const PAGE_TITLE = 'All Categories';
const breadcrumbs = [{ title: 'Home', href: '/' }, { title: PAGE_TITLE }];

const Card: CardTableProps<Category>['card'] = (
  { name, count, created_at },
  index,
) => (
  <MCard
    shadow="sm"
    radius="md"
    withBorder
    key={index}
    component="a"
    href="#"
    className={classes.card}
  >
    <Stack>
      <Text size="sm">{name}</Text>
      <Group wrap="nowrap" gap="xs">
        <Badge
          variant="transparent"
          leftSection={<IconArticle size={16} />}
          p={0}
        >
          {count}
        </Badge>
        <Badge
          variant="transparent"
          leftSection={<IconCalendarTime size={16} />}
          p={0}
        >
          {created_at}
        </Badge>
      </Group>
    </Stack>
  </MCard>
);

export function AllCategories() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    importData<Category>({ path: 'categories' }).then((categories) =>
      setCategories(categories),
    );
  }, []);

  const columns: CardTableProps<Category>['columns'] = [
    {
      accessor: 'name',
      title: 'Alphabetically',
      sortable: true,
    },
    {
      accessor: 'created_at',
      title: 'Most recent',
      sortable: true,
    },
    {
      accessor: 'count',
      title: 'Most used',
      sortable: true,
    },
  ];

  const filterFn: CardTableProps<Category>['filterFn'] =
    (debouncedQuery) =>
    ({ name }) => {
      if (
        debouncedQuery !== '' &&
        !(name as string)
          .toLowerCase()
          .includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    };

  const sort_status: CardTableProps<Category>['sort_status'] = {
    columnAccessor: 'created_at',
    direction: 'desc',
  };

  return (
    <ParentLayout title={PAGE_TITLE}>
      <Container size="lg">
        <Breadcrumbs items={breadcrumbs} />
        <Title order={2} my="xl">
          {PAGE_TITLE}
        </Title>
      </Container>
      <MainSection>
        <CardTable
          textSelectionDisabled
          paginationSize="md"
          recordsPerPageLabel="Categories per page"
          query={query}
          data={categories} // TODO: Change no records component
          sort_status={sort_status}
          columns={columns}
          card={Card}
          filterFn={filterFn}
          className={classes.card_table}
        />
      </MainSection>
    </ParentLayout>
  );
}

export default AllCategories;
