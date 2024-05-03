import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';
import {
  ActionIcon,
  Badge,
  Flex,
  Group,
  MantineColor,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { Invoices, InvoiceStatus } from '@/types';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconSearch, IconTrashX } from '@tabler/icons-react';
import { ErrorAlert } from '@/Components/Dashboard';

const PAGE_SIZES = [5, 10, 20];

const ICON_SIZE = 18;

type StatusBadgeProps = {
  status: InvoiceStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor = '';

  switch (status) {
    case 'sent':
      color = 'blue';
      break;
    case 'suspended':
      color = 'gray';
      break;
    case 'cancelled':
      color = 'red';
      break;
    case 'approved':
      color = 'green.8';
      break;
    case 'pending':
      color = 'cyan.7';
      break;
    default:
      color = 'dark';
  }

  return (
    <Badge color={color} variant="filled" radius="sm">
      {status}
    </Badge>
  );
};

type InvoicesTableProps = {
  data: Invoices[];
  error?: ReactNode;
  loading?: boolean;
};

const InvoicesTable = ({ data, error, loading }: InvoicesTableProps) => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<Invoices[]>([]);
  const [records, setRecords] = useState<Invoices[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'full_name',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const statuses = useMemo(() => {
    const statuses = new Set(data.map((e) => e.status));
    // @ts-ignore
    return [...statuses];
  }, [data]);

  const columns: DataTableProps<Invoices>['columns'] = [
    {
      accessor: 'full_name',
      title: 'Customer',
      render: ({ full_name, email }: any) => {
        return (
          <Flex component={UnstyledButton} gap="xs" align="center">
            <Stack gap={1}>
              <Text fw={600}>{full_name}</Text>
            </Stack>
          </Flex>
        );
      },
      sortable: true,
      filter: (
        <TextInput
          label="Customer"
          description="Show customer whose names include the specified text"
          placeholder="Search customer..."
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
    },
    {
      accessor: 'author',
      render: () => {
        return (
          <Flex component={UnstyledButton} gap="xs" align="center">
            <Stack gap={1}>
              <Text>Vagrant</Text>
            </Stack>
          </Flex>
        );
      },
    },
    {
      accessor: 'categories',
      render: (item: any) => <StatusBadge status={item.status} />,
      filter: (
        <MultiSelect
          label="Status"
          description="Show all products with status"
          data={statuses}
          value={selectedStatuses}
          placeholder="Search statuses…"
          onChange={setSelectedStatuses}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedStatuses.length > 0,
    },
    {
      accessor: 'tags',
      render: (item: any) => <StatusBadge status={item.status} />,
      filter: (
        <MultiSelect
          label="Status"
          description="Show all products with status"
          data={statuses}
          value={selectedStatuses}
          placeholder="Search statuses…"
          onChange={setSelectedStatuses}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedStatuses.length > 0,
    },
    {
      accessor: 'status',
      render: (item: any) => <StatusBadge status={item.status} />,
      filter: (
        <MultiSelect
          label="Status"
          description="Show all products with status"
          data={statuses}
          value={selectedStatuses}
          placeholder="Search statuses…"
          onChange={setSelectedStatuses}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      filtering: selectedStatuses.length > 0,
    },
    {
      accessor: 'publish_date',
      title: 'Publish Date',
    },
    {
      accessor: '',
      title: 'Actions',
      render: (item: any) => (
        <Group gap="sm">
          <Tooltip label="Delete">
            <ActionIcon color="red">
              <IconTrashX size={ICON_SIZE} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit">
            <ActionIcon>
              <IconEdit size={ICON_SIZE} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as Invoices[];
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as Invoices[];

    if (debouncedQuery || selectedStatuses.length) {
      filtered = data
        .filter(({ full_name, status }) => {
          if (
            debouncedQuery !== '' &&
            !full_name
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }

          // @ts-ignore
          if (
            selectedStatuses.length &&
            !selectedStatuses.some((s) => s === status)
          ) {
            return false;
          }
          return true;
        })
        .slice(from, to);
    }

    setRecords(filtered);
  }, [sortStatus, data, page, pageSize, debouncedQuery, selectedStatuses]);

  return error ? (
    <ErrorAlert title="Error loading invoices" message={error.toString()} />
  ) : (
    <DataTable
      minHeight={200}
      verticalSpacing="xs"
      striped
      highlightOnHover
      // @ts-ignore
      columns={columns}
      records={records}
      selectedRecords={selectedRecords}
      // @ts-ignore
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={
        debouncedQuery || selectedStatuses.length > 0
          ? records.length
          : data.length
      }
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={loading}
    />
  );
};

export default InvoicesTable;
