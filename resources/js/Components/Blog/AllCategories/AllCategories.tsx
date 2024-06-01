import { useEffect, useState, useId } from 'react';
import { VerticalCard } from '@/Components/Blog';
import { IconSearch } from '@tabler/icons-react';
import { DataTable } from '@/Components/Global/DataTable';
import {
  type DataTableSortStatus,
  type DataTableColumn,
} from 'mantine-datatable';
import { importData } from '@/faker/helpers';
import { type Tag } from '@/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import classes from './AllCategories.module.css';
import { Group, Select, TextInput } from '@mantine/core';

export interface AllCategoriesProps {}

type SortDirection = 'asc' | 'desc';
type SortableLabel = 'title' | 'created_at' | 'view' | 'like';

interface NewHeaderProps {
  initial_sort: { columnAccessor: SortableLabel; direction: SortDirection };
  refs: Array<{ label: SortableLabel; ref: HTMLElement }> | null;
}

const NewHeader = ({ refs, initial_sort }: NewHeaderProps) => {
  const [type, setType] = useState<SortableLabel>(initial_sort.columnAccessor);
  const [direction, setDirection] = useState<SortDirection>(
    initial_sort.direction,
  );

  const sort = (t?: SortableLabel) => {
    refs?.filter(({ label }) => label === (t ?? type))[0].ref.click();
  };

  const onTypeChange = (value: string | null) => {
    if (value !== type) {
      setType(value as SortableLabel);
      sort(value as SortableLabel);
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
          { value: 'title', label: 'Alphabetically' },
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

export function AllCategories({}: AllCategoriesProps) {
  const id = useId();
  const [bodyRef] = useAutoAnimate<HTMLTableSectionElement>();
  const [table_ref, setTableRef] = useState<HTMLTableElement | null>(null);
  const [sortable_refs, setSortableRefs] = useState<
    NewHeaderProps['refs'] | null
  >(null);
  const [tags, setTags] = useState<Array<Tag>>([]);

  const initial_sort = {
    columnAccessor: 'created_at',
    direction: 'desc',
  };

  const sortables: Array<DataTableColumn<Tag>> = [
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
    importData<Tag>({ path: '#/storage/fake/tags.json' }).then((tags) =>
      setTags(tags),
    );
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

  const body_columns: Array<DataTableColumn<Tag>> = [
    ...columns.map((r_item, index) => {
      const item = { ...r_item };

      if (index === 0) {
        item.render = (post, index) => (
          <VerticalCard
            title={post.title}
            cover={post.cover}
            created_at={post.created_at}
            like={post.like}
            view={post.view}
            key={index}
          />
        );
      }

      item.title = <div id={`${id}__${item.accessor}__`} />;

      return item;
    }),
    {
      accessor: '',
      title: (
        <NewHeader
          refs={sortable_refs}
          initial_sort={initial_sort as NewHeaderProps['initial_sort']}
        />
      ),
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
      recordsPerPageLabel="Tags per page"
      data={tags} // TODO: Change no records component
      columns={body_columns}
      tableRef={setTableRef}
      bodyRef={bodyRef}
      query={query}
      sort_status={initial_sort as DataTableSortStatus}
      filterFn={(debouncedQuery) =>
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
        }}
    />
  );
}

export default AllCategories;
