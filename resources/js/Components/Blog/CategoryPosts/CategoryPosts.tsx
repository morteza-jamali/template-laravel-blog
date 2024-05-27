import { useEffect, useState, useId } from 'react';
import { VerticalCard } from '@/Components/Blog';
import { IconSearch } from '@tabler/icons-react';
import { DataTable } from '@/Components/Global/DataTable';
import { type DataTableColumn } from 'mantine-datatable';
import { gPosts } from '@/faker/Post';
import { type Post } from '@/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import classes from './CategoryPosts.module.css';
import { Group, Select, TextInput } from '@mantine/core';

export interface CategoryPostsProps {}

interface HeaderCellProps {
  name: string;
}

const HeaderCell = ({ name }: HeaderCellProps) => {
  const id = useId();

  return <div id={`${id}_${name}`} />;
};

export function CategoryPosts({}: CategoryPostsProps) {
  const [bodyRef] = useAutoAnimate<HTMLTableSectionElement>();
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    gPosts().then((posts) => setPosts(posts));
  }, []);

  const [query, setQuery] = useState('');
  const sortables: Array<DataTableColumn<Post>> = [
    {
      accessor: 'title',
    },
    {
      accessor: 'created_at',
    },
    {
      accessor: 'updated_at',
    },
    {
      accessor: 'view',
    },
  ].map((item) => ({
    title: item.accessor,
    sortable: true,
    render: () => null,
    ...item,
  }));

  const body_columns: Array<DataTableColumn<Post>> = [
    ...sortables.map((r_item, index) => {
      const item = { ...r_item };

      if (index === 0) {
        item.render = (post, index) => (
          <VerticalCard
            title={post.title}
            cover={post.cover}
            created_at={post.created_at}
            key={index}
          />
        );
      }

      item.title = <HeaderCell name={item.accessor} />;

      return item;
    }),
    {
      accessor: '',
      title: (
        <Group wrap="nowrap" gap="xs" align="flex-end">
          <Select
            label="Your favorite library"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <Select
            label="Your favorite library"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <TextInput
            placeholder="Search tags, title"
            rightSection={<IconSearch size={16} />}
          />
        </Group>
      ),
      render: () => null,
    },
  ];

  console.log(body_columns);
  console.log(sortables);

  return (
    //@ts-ignore
    <DataTable
      withRowBorders={false}
      classNames={{
        root: classes.root,
        table: classes.table,
        header: classes.header,
      }}
      textSelectionDisabled
      paginationSize="md"
      recordsPerPageLabel="Posts per page"
      data={posts} // TODO: Change no records component
      columns={body_columns}
      tableRef={(ref) => {
        const titleRef = ref?.querySelectorAll(
          '.mantine-Table-th',
        )[1] as HTMLElement;

        // setInterval(() => {
        //   titleRef?.click();
        // }, 3000);

        console.log(titleRef);

        // ref?.tHead?.querySelector('#category_posts_table_header_title'),
        // childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]
        //   ?.childNodes[0]?.childNodes[0]
      }}
      bodyRef={bodyRef}
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
