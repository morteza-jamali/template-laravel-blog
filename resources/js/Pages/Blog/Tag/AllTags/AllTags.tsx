import { useState, useEffect } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  type CardTableProps,
} from '@/Components/Blog';
import { type Tag } from '@/types';
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
import classes from './AllTags.module.css';

const PAGE_TITLE = 'All Tags';
const breadcrumbs = [{ title: 'Home', href: '/' }, { title: PAGE_TITLE }];

const Card: CardTableProps<Tag>['card'] = (
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

export function AllTags() {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<Array<Tag>>([]);

  useEffect(() => {
    importData<Tag>({ path: 'tags' }).then((tags) => setTags(tags));
  }, []);

  const columns: CardTableProps<Tag>['columns'] = [
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

  const filterFn: CardTableProps<Tag>['filterFn'] =
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

  const sort_status: CardTableProps<Tag>['sort_status'] = {
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
      <MainSection tags_box={false}>
        <CardTable
          textSelectionDisabled
          paginationSize="md"
          recordsPerPageLabel="Tags per page"
          query={query}
          data={tags} // TODO: Change no records component
          sort_status={sort_status}
          page_size={50}
          columns={columns}
          card={Card}
          filterFn={filterFn}
          className={classes.card_table}
        />
      </MainSection>
    </ParentLayout>
  );
}

export default AllTags;
