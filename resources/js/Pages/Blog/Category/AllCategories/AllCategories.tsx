import { useState } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  type CardTableProps,
  type TagsBoxProps,
} from '@/Components/Blog';
import { Link } from '@inertiajs/react';
import { type Category } from '@/types';
import { IconArticle, IconCalendarTime } from '@tabler/icons-react';
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
import ROUTES from '@/routes';

const PAGE_TITLE = 'All Categories';
const breadcrumbs = [{ title: 'Home', href: '/' }, { title: PAGE_TITLE }];

const Card: CardTableProps<Category>['card'] = (
  { name, count, created_at, id },
  index,
) => (
  <MCard
    shadow="sm"
    radius="md"
    withBorder
    key={index}
    component={Link}
    href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${id}`}
    className={classes.card}
  >
    <Stack justify="space-between" className={classes.stack}>
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

interface AllCategoriesProps {
  categories: Array<Category>;
  top_tags: TagsBoxProps['data'];
}

export function AllCategories({ categories, top_tags }: AllCategoriesProps) {
  const [query, setQuery] = useState('');

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
      <MainSection tags={{ data: top_tags }}>
        <CardTable
          textSelectionDisabled
          paginationSize="md"
          recordsPerPageLabel="Categories per page"
          query={query}
          data={categories} // TODO: Change no records component
          sort_status={sort_status}
          page_size={20}
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
