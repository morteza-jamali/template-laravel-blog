import { useState } from 'react';
import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CardTable,
  VerticalCard,
  type CardTableProps,
  type VerticalCardProps,
  type CategoriesBoxProps,
  type TagsBoxProps,
} from '@/Components/Blog';
import { type Post, type Tag } from '@/types';
import { Container, Title } from '@mantine/core';
import ROUTES from '@/routes';

const Card: CardTableProps<Post>['card'] = (post, index) => (
  <VerticalCard data={post as any} key={index} />
);

interface SingleTagProps {
  tag: Tag;
  posts: Array<VerticalCardProps['data']>;
  top_categories: CategoriesBoxProps['data'];
  top_tags: TagsBoxProps['data'];
}

export function SingleTag({
  posts,
  tag,
  top_categories,
  top_tags,
}: SingleTagProps) {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Tags', href: ROUTES.BLOG.TAG.ALL },
    { title: tag.name },
  ];
  const [query, setQuery] = useState('');

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
    <ParentLayout title={tag.name}>
      <Container size="lg">
        <Breadcrumbs items={breadcrumbs} />
        <Title order={2} my="xl">
          {tag.name}
        </Title>
      </Container>
      <MainSection
        categories={{ data: top_categories }}
        tags={{ data: top_tags }}
      >
        <CardTable
          textSelectionDisabled
          paginationSize="md"
          recordsPerPageLabel="Posts per page"
          query={query}
          page_size={10}
          data={posts as unknown as Array<Post>} // TODO: Change no records component
          sort_status={sort_status}
          columns={columns}
          card={Card}
          filterFn={filterFn}
        />
      </MainSection>
    </ParentLayout>
  );
}

export default SingleTag;
