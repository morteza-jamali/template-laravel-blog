import { VerticalCard } from '@/Components/Blog';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { generateCategories } from '@/faker/Categories';
import classes from './CategoryPosts.module.css';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

const categories = generateCategories(20);

export interface CategoryPostsProps {}

export function CategoryPosts({}: CategoryPostsProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: 'title',
    direction: 'asc',
  });
  const [records, setRecords] = useState(sortBy(categories, 'title'));

  useEffect(() => {
    const data = sortBy(categories, sortStatus.columnAccessor) as any[];
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <DataTable
      withRowBorders={false}
      className={classes.root}
      columns={[
        {
          accessor: 'title',
          sortable: true,
          render: (category, index) => <VerticalCard key={index} />,
        },
        {
          accessor: 'count',
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
