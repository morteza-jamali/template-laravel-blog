import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  uniqBy,
  differenceBy,
  DataTable as DT,
  DataTableProps as DTProps,
  DataTableSortStatus as DTSortStatus,
} from 'mantine-datatable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import sortBy from 'lodash/sortBy';
import { useDebouncedValue } from '@mantine/hooks';
import { ErrorAlert } from '@/Components/Dashboard';

const PAGE_SIZES = [5, 10, 20, 50, 100];

export interface FilterFnCallback<T = Record<string, unknown>> {
  (param: Partial<T>): any;
}

export type DataTableProps<T = Record<string, unknown>> = DTProps<T> & {
  data: Array<T>;
  sort_status: DTSortStatus;
  selectedRecords?: DTProps<T>['selectedRecords'];
  onSelectedRecordsChange?: DTProps<T>['onSelectedRecordsChange'];
  setAllSelectedRecords?: Dispatch<SetStateAction<Array<T>>>;
  selectedAll?: boolean;
  columns: DTProps<T>['columns'];
  query: string;
  error?: ReactNode;
  loading?: boolean;
  page_size?: 5 | 10 | 20 | 50 | 100;
  filterFn: (dq: string) => FilterFnCallback<T>;
};

export function DataTable<T>({
  data,
  error,
  loading,
  sort_status,
  columns,
  query,
  page_size,
  filterFn,
  selectedRecords,
  onSelectedRecordsChange,
  setAllSelectedRecords,
  selectedAll,
  ...rest
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [bodyRef] = useAutoAnimate<HTMLTableSectionElement>();
  const [delete_initial_select, deleteInitialSelect] = useState<boolean>(true);
  const [allRecordsSelected, setAllRecordsSelected] = useState(selectedAll);
  const [unselectedRecords, setUnselectedRecords] = useState<Array<T>>([]);
  const [pageSize, setPageSize] = useState((page_size ?? 5) as number);
  const [records, setRecords] = useState<DataTableProps<T>['data']>(
    data.slice(0, pageSize),
  );
  const [sortStatus, setSortStatus] = useState<DTSortStatus>(sort_status);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const handleSelectedRecordsChange = (newSelectedRecords: Array<T>) => {
    if (allRecordsSelected) {
      const recordsToUnselect = records.filter(
        (record) => !newSelectedRecords.includes(record),
      );
      setUnselectedRecords(
        uniqBy(
          [...unselectedRecords, ...recordsToUnselect],
          (r) => (r as any).id,
        ).filter((r) => !newSelectedRecords.includes(r)),
      );
    } else {
      (onSelectedRecordsChange as any)(newSelectedRecords);
    }
  };

  useEffect(() => {
    if (delete_initial_select) {
      deleteInitialSelect(false);

      return;
    }

    if (allRecordsSelected) {
      setAllRecordsSelected(false);
      (onSelectedRecordsChange as any)([]);
      setUnselectedRecords([]);
    } else {
      setAllRecordsSelected(true);
    }
  }, [selectedAll]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as Array<T>;
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as Array<T>;

    if (debouncedQuery) {
      filtered = data.filter(filterFn(debouncedQuery)).slice(from, to);
    }

    setRecords(filtered);

    if (typeof onSelectedRecordsChange === 'function' && allRecordsSelected) {
      onSelectedRecordsChange(
        differenceBy(filtered, unselectedRecords, (r) => (r as any).id),
      );
    }
  }, [
    sortStatus,
    data,
    page,
    pageSize,
    debouncedQuery,
    allRecordsSelected,
    unselectedRecords,
  ]);

  useEffect(() => {
    if (typeof setAllSelectedRecords === 'function') {
      if (allRecordsSelected) {
        setAllSelectedRecords(
          differenceBy(data, unselectedRecords, (r) => (r as any).id),
        );
      } else {
        setAllSelectedRecords(selectedRecords as Array<T>);
      }
    }
  }, [selectedRecords]);

  return error ? (
    <ErrorAlert title="Error loading invoices" message={error.toString()} />
  ) : (
    <DT
      columns={columns as any}
      records={records}
      totalRecords={debouncedQuery ? records.length : data.length}
      recordsPerPage={pageSize}
      page={page}
      bodyRef={bodyRef}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus as any}
      onSortStatusChange={setSortStatus as any}
      fetching={loading}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={
        typeof onSelectedRecordsChange === 'function'
          ? handleSelectedRecordsChange
          : undefined
      }
      {...rest}
    />
  );
}

export default DataTable;
