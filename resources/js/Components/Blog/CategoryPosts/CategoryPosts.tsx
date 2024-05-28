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

type SortDirection = 'asc' | 'desc';
type SortableLabel = 'title' | 'created_at' | 'view' | 'like';
type SortType = Omit<SortableLabel, 'title'>;

interface NewHeaderProps {
  refs: Array<{ label: SortableLabel; ref: HTMLElement }> | null;
}

const NewHeader = ({ refs }: NewHeaderProps) => {
  const [type, setType] = useState<SortType>('created_at');
  const [direction, setDirection] = useState<SortDirection>('desc');

  const sort = (t?: SortType) => {
    refs?.filter(({ label }) => label === (t ?? type))[0].ref.click();
  };

  const onTypeChange = (value: string | null) => {
    if (value !== type) {
      setType(value as SortType);
      sort(value as SortType);
    }
  };

  const onDirectionChange = (value: string | null) => {
    if (value !== direction) {
      setDirection(value as SortDirection);
      sort();
    }
  };

  return (
    <Group wrap="nowrap" gap="xs" align="flex-end">
      <Select
        label="Sort"
        value={type as string}
        onChange={onTypeChange}
        data={[
          { value: 'view', label: 'Most viewed' },
          { value: 'created_at', label: 'Most recent' },
          { value: 'like', label: 'Most liked' },
        ]}
        allowDeselect={false}
      />
      <Select
        onChange={onDirectionChange}
        value={direction}
        data={[
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' },
        ]}
        allowDeselect={false}
      />
      <TextInput
        placeholder="Search tags, title"
        rightSection={<IconSearch size={16} />}
      />
    </Group>
  );
};

export function CategoryPosts({}: CategoryPostsProps) {
  const id = useId();
  const [bodyRef] = useAutoAnimate<HTMLTableSectionElement>();
  const [table_ref, setTableRef] = useState<HTMLTableElement | null>(null);
  const [sortable_refs, setSortableRefs] = useState<
    NewHeaderProps['refs'] | null
  >(null);
  const [posts, setPosts] = useState<Array<Post>>([]);

  const sortables: Array<DataTableColumn<Post>> = [
    {
      accessor: 'title',
    },
    {
      accessor: 'created_at',
    },
    {
      accessor: 'view',
    },
    {
      accessor: 'like',
    },
  ];

  useEffect(() => {
    gPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    let filtered: NewHeaderProps['refs'] = [];
    const refs = table_ref?.querySelectorAll(
      '.mantine-Table-th',
    ) as unknown as Array<HTMLElement>;

    if (refs) {
      for (const s of sortables) {
        filtered.push({
          label: s.accessor as SortableLabel,
          ref: [...refs].filter(
            (r) => r.querySelector(`[id='${id}__${s.accessor}__']`) !== null,
          )[0],
        });
      }

      setSortableRefs(filtered);
    }
  }, [table_ref]);

  const [query, setQuery] = useState('');
  const columns = sortables.map((item) => ({
    title: item.accessor,
    sortable: true,
    render: () => null,
    ...item,
  }));

  const body_columns: Array<DataTableColumn<Post>> = [
    ...columns.map((r_item, index) => {
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

      item.title = <div id={`${id}__${item.accessor}__`} />;

      return item;
    }),
    {
      accessor: '',
      title: <NewHeader refs={sortable_refs} />,
      render: () => null,
    },
  ];

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
      tableRef={setTableRef}
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
