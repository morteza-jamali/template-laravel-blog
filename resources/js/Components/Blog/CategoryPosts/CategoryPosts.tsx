import { VerticalCard } from '@/Components/Blog';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { gPosts } from '@/faker/Post';
import { Post } from '@/types';
import classes from './CategoryPosts.module.css';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

export interface CategoryPostsProps {}

const posts = gPosts(20);

export function CategoryPosts({}: CategoryPostsProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Post>>({
    columnAccessor: 'title',
    direction: 'asc',
  });
  const [records, setRecords] = useState(sortBy(posts, 'title'));

  useEffect(() => {
    const data = sortBy(posts, sortStatus.columnAccessor) as Post[];
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  console.clear();
  console.log(posts);

  return (
    <DataTable
      withRowBorders={false}
      className={classes.root}
      columns={[
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
      ]}
      records={records}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}

export default CategoryPosts;
