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

export interface DataTableProps<T> {
  data: T[];
  sort_status: DTSortStatus;
  columns: DTProps<T>['columns'];
  query: string;
  error?: ReactNode;
  loading?: boolean;
}

export function DataTable<T>({
  data,
  error,
  loading,
  sort_status,
  columns,
  query,
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as T[];
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as T[];

    if (debouncedQuery || selectedStatuses.length) {
      filtered = data
        .filter((/*{ full_name, status }*/) => {
          // if (
          //   debouncedQuery !== '' &&
          //   !full_name
          //     .toLowerCase()
          //     .includes(debouncedQuery.trim().toLowerCase())
          // ) {
          //   return false;
          // }

          // // @ts-ignore
          // if (
          //   selectedStatuses.length &&
          //   !selectedStatuses.some((s) => s === status)
          // ) {
          //   return false;
          // }

          return true;
        })
        .slice(from, to);
    }

    setRecords(filtered);
  }, [sortStatus, data, page, pageSize, debouncedQuery, selectedStatuses]);

  return error ? (
    <ErrorAlert title="Error loading invoices" message={error.toString()} />
  ) : (
    <DT
      minHeight={200}
      verticalSpacing="xs"
      striped
      highlightOnHover
      // @ts-ignore
      columns={columns as any}
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
      sortStatus={sortStatus as any}
      onSortStatusChange={setSortStatus as any}
      fetching={loading}
      {...props}
    />
  );
}

export default DataTable;
