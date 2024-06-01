import { useEffect, useState, useId } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { DataTable, type DataTableProps } from '@/Components/Global/DataTable';
import {
  type DataTableColumn,
  type DataTableSortStatus,
} from 'mantine-datatable';
import classes from './CardTable.module.css';
import { Group, Select, TextInput } from '@mantine/core';

export type CardTableProps<T> = Omit<DataTableProps<T>, 'columns'> & {
  card: DataTableColumn<T>['render'];
  columns: Array<DataTableColumn<T>>;
};

type SortDirection = 'asc' | 'desc';

interface NewHeaderProps {
  sort_status: DataTableSortStatus;
  refs: Array<{
    label: string;
    value: string;
    ref: HTMLElement;
  }> | null;
}

const generateTitleId = ({ id, accessor }: { id: string; accessor: string }) =>
  `${id}__${accessor}__`;

const NewHeader = ({ refs, sort_status }: NewHeaderProps) => {
  const [type, setType] = useState<string>(sort_status.columnAccessor);
  const [direction, setDirection] = useState<SortDirection>(
    sort_status.direction,
  );

  const sort = (t?: string) => {
    refs?.filter(({ value }) => value === (t ?? type))[0].ref.click();
  };

  const onTypeChange = (value: string | null) => {
    if (value !== type) {
      setType(value as string);
      sort(value as string);
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
        data={refs?.map(({ label, value }) => ({ label, value }))}
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

export function CardTable<T>({ card, columns, ...props }: CardTableProps<T>) {
  const id = useId();
  const [table_ref, setTableRef] = useState<HTMLTableElement | null>(null);
  const [sortable_refs, setSortableRefs] = useState<
    NewHeaderProps['refs'] | null
  >(null);

  const sortables = columns.filter(({ sortable }) => sortable);

  useEffect(() => {
    let filtered: NewHeaderProps['refs'] = [];
    const refs = table_ref?.querySelectorAll(
      '.mantine-Table-th',
    ) as unknown as Array<HTMLElement>;

    if (refs) {
      for (const s of sortables) {
        filtered.push({
          label: String(s.title),
          value: String(s.accessor),
          ref: [...refs].filter(
            (r) =>
              r.querySelector(
                `[id='${generateTitleId({ id, accessor: String(s.accessor) })}']`,
              ) !== null,
          )[0],
        });
      }

      setSortableRefs(filtered);
    }
  }, [table_ref]);

  const body_columns = [
    ...sortables.map((r_col, index) => {
      const col = { ...r_col };

      if (index === 0) {
        col.render = card;
      } else {
        col.render = () => null;
      }

      col.title = (
        <div id={generateTitleId({ id, accessor: String(col.accessor) })} />
      );

      return col;
    }),
    {
      accessor: '',
      title: <NewHeader refs={sortable_refs} sort_status={props.sort_status} />,
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
      columns={body_columns}
      tableRef={setTableRef}
      {...props}
    />
  );
}

export default CardTable;
