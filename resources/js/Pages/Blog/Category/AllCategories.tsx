import { useState, useEffect } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  type CardTableProps,
} from '@/Components/Blog';
import { type Category } from '@/types';
import { importData } from '@/faker/helpers';
import { Container, Title } from '@mantine/core';

const PAGE_TITLE = 'All Categories';
const breadcrumbs = [{ title: 'Home', href: '/' }, { title: PAGE_TITLE }];

export function AllCategories() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    importData<Category>({ path: '#/storage/fake/categories.json' }).then(
      (categories) => setCategories(categories),
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

  const card: CardTableProps<Category>['card'] = ({ name }, index) => (
    <div key={index}>{name}</div>
  );

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
          card={card}
          filterFn={filterFn}
        />
      </MainSection>
    </ParentLayout>
  );
}

export default AllCategories;
