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
import { type Category, type Post } from '@/types';
import { Container, Title } from '@mantine/core';
import ROUTES from '@/routes';

const Card: CardTableProps<Post>['card'] = (post, index) => (
  <VerticalCard data={post as any} key={index} />
);

interface SingleCategoryProps {
  category: Category;
  posts: Array<VerticalCardProps['data']>;
  top_categories: CategoriesBoxProps['data'];
  top_tags: TagsBoxProps['data'];
}

export function SingleCategory({
  category,
  posts,
  top_categories,
  top_tags,
}: SingleCategoryProps) {
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Categories', href: ROUTES.BLOG.CATEGORY.ALL },
    { title: category.name },
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
    <ParentLayout title={category.name}>
      <Container size="lg">
        <Breadcrumbs items={breadcrumbs} />
        <Title order={2} my="xl">
          {category.name}
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
          page_size={10}
          query={query}
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

export default SingleCategory;
