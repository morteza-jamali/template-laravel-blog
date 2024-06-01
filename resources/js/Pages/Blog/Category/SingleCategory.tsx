import { useState, useEffect } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  VerticalCard,
  type CardTableProps,
} from '@/Components/Blog';
import { type Post } from '@/types';
import { importData } from '@/faker/helpers';
import { Container, Title } from '@mantine/core';

const PAGE_TITLE = 'Category name';
const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Categories', href: '#' },
  { title: PAGE_TITLE },
];

export function SingleCategory() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    importData<Post>({ path: 'posts' }).then((posts) => setPosts(posts));
  }, []);

  const columns: CardTableProps<Post>['columns'] = [
    {
      accessor: 'title',
      title: 'Alphabetically',
      sortable: true,
    },
    {
      accessor: 'created_at',
      title: 'Most recent',
      sortable: true,
    },
    {
      accessor: 'view',
      title: 'Most viewed',
      sortable: true,
    },
    {
      accessor: 'like',
      title: 'Most liked',
      sortable: true,
    },
  ];

  const card: CardTableProps<Post>['card'] = (post, index) => (
    <VerticalCard
      title={post.title}
      cover={post.cover}
      created_at={post.created_at}
      like={post.like}
      view={post.view}
      key={index}
    />
  );

  const filterFn: CardTableProps<Post>['filterFn'] =
    (debouncedQuery) =>
    ({ title }) => {
      if (
        debouncedQuery !== '' &&
        !(title as string)
          .toLowerCase()
          .includes(debouncedQuery.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    };

  const sort_status: CardTableProps<Post>['sort_status'] = {
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
          recordsPerPageLabel="Posts per page"
          query={query}
          data={posts} // TODO: Change no records component
          sort_status={sort_status}
          columns={columns}
          card={card}
          filterFn={filterFn}
        />
      </MainSection>
    </ParentLayout>
  );
}

export default SingleCategory;
