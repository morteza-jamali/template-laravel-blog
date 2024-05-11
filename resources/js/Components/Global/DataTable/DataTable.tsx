import { ReactNode, useEffect, useState } from 'react';
import {
  DataTable as DT,
  DataTableProps as DTProps,
  DataTableSortStatus as DTSortStatus,
} from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useDebouncedValue } from '@mantine/hooks';
import { ErrorAlert } from '@/Components/Dashboard';

const PAGE_SIZES = [5, 10, 20];

export interface FilterFnCallback<T> {
  (param: Partial<T>): any;
}

export interface DataTableProps<T> {
  data: T[];
  sort_status: DTSortStatus;
  columns: DTProps<T>['columns'];
  query: string;
  error?: ReactNode;
  loading?: boolean;
  filterFn: (dq: string) => FilterFnCallback<T>;
}

export function DataTable<T>({
  data,
  error,
  loading,
  sort_status,
  columns,
  query,
  filterFn,
  ...props
}: DataTableProps<T> & DTProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<
    DataTableProps<T>['data']
  >([]);
  const [records, setRecords] = useState<DataTableProps<T>['data']>(
    data.slice(0, pageSize),
  );
  const [sortStatus, setSortStatus] = useState<DTSortStatus>(sort_status);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as T[];
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as T[];

    if (debouncedQuery) {
      filtered = data.filter(filterFn(debouncedQuery)).slice(from, to);
    }

    setRecords(filtered);
  }, [sortStatus, data, page, pageSize, debouncedQuery]);

  return error ? (
    <ErrorAlert title="Error loading invoices" message={error.toString()} />
  ) : (
    <DT
      minHeight={200}
      verticalSpacing="xs"
      striped
      highlightOnHover
      columns={columns as any}
      records={records}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={debouncedQuery ? records.length : data.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus as any}
      onSortStatusChange={setSortStatus as any}
      fetching={loading}
      {...props}
    />
  );
}

export default DataTable;
