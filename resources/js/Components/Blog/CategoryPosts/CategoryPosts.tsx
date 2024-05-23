import { useState } from 'react';
import { VerticalCard } from '@/Components/Blog';
import { DataTable, type DataTableProps } from '@/Components/Global/DataTable';
import { gPosts } from '@/faker/Post';
import { Post } from '@/types';
import classes from './CategoryPosts.module.css';

export interface CategoryPostsProps {}

const posts = gPosts(20);

export function CategoryPosts({}: CategoryPostsProps) {
  const [query, setQuery] = useState('');
  const columns: DataTableProps<Post>['columns'] = [
    {
      accessor: 'title',
      sortable: true,
      render: (post, index) => (
        <VerticalCard
          title={post.title}
          cover={post.cover}
          created_at={post.created_at}
          key={index}
        />
      ),
    },
    {
      accessor: 'created_at',
      sortable: true,
      render: () => null,
    },
    {
      accessor: 'updated_at',
      sortable: true,
      render: () => null,
    },
    {
      accessor: 'tags',
      render: () => null,
    },
  ];

  return (
    //@ts-ignore
    <DataTable
      withRowBorders={false}
      className={classes.root}
      textSelectionDisabled
      paginationSize="md"
      recordsPerPageLabel="Posts per page"
      data={posts} // TODO: Change no records component
      columns={columns}
      query={query}
      sort_status={{
        columnAccessor: 'created_at',
        direction: 'asc',
      }}
      filterFn={(debouncedQuery) =>
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
        }}
    />
  );
}

export default CategoryPosts;
