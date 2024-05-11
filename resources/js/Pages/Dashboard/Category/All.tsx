import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  TextInput,
  Tooltip,
  Center,
} from '@mantine/core';
import { Link } from '@inertiajs/react';
import { PageHeader, AppShell } from '@/Components/Dashboard';
import { PageLayout } from '@/Components/Global';
import { DataTable, DataTableProps } from '@/Components/Global/DataTable';
import {
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconTrashX,
  IconEdit,
  IconClick,
} from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { useDataTableColumns } from 'mantine-datatable';
import ROUTES from '@/routes';

import type { Category } from '@/types';

const PAGE_TITLE = 'All Categories';
const items = [
  { title: 'Dashboard', href: ROUTES.DASHBOARD.HOME },
  { title: 'Categories', href: '#' },
  { title: PAGE_TITLE, href: ROUTES.DASHBOARD.CATEGORY.ALL },
].map((item, index) => (
  <Anchor href={item.href} key={index} component={Link}>
    {item.title}
  </Anchor>
));

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
};

interface AllCategoriesProps {
  pathname: string;
  categories: Category[];
}

export const AllCategories = ({ categories, pathname }: AllCategoriesProps) => {
  const ICON_SIZE = 18;
  const { showContextMenu, hideContextMenu } = useContextMenu();
  const [query, setQuery] = useState('');
  const TABLE_KEY = 'all-categories-table';
  const columnsSharedProps = {
    resizable: true,
    draggable: true,
  };
  const columns: DataTableProps<Category>['columns'] = [
    {
      accessor: 'id',
      sortable: true,
    },
    {
      accessor: 'name',
      sortable: true,
      filter: (
        <TextInput
          label="Name"
          description="Show category whose names include the specified text"
          placeholder="Search category..."
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
      ...columnsSharedProps,
    },
    {
      accessor: 'slug',
      ...columnsSharedProps,
    },
    {
      accessor: 'description',
      ellipsis: true,
      width: 200,
      ...columnsSharedProps,
    },
    {
      accessor: 'parent',
    },
    {
      accessor: 'count',
      sortable: true,
    },
    {
      accessor: 'created_at',
      sortable: true,
      ...columnsSharedProps,
    },
    {
      accessor: 'updated_at',
      sortable: true,
      ...columnsSharedProps,
    },
    {
      accessor: '',
      title: (
        <Center>
          <IconClick size={16} />
        </Center>
      ),
      width: '0%',
      render: (item: any) => (
        <Group gap="sm" justify="center" wrap="nowrap">
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
  const { effectiveColumns } = useDataTableColumns<Category>({
    key: TABLE_KEY,
    columns,
  });

  return (
    <PageLayout pathname={pathname} title={PAGE_TITLE}>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader
            title={PAGE_TITLE}
            breadcrumbItems={items}
            rightSection={
              <Button
                component={Link}
                href={ROUTES.DASHBOARD.CATEGORY.NEW}
                leftSection={<IconPlus size={18} />}
              >
                Add New
              </Button>
            }
          />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                {PAGE_TITLE}
              </Text>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Group>
            <DataTable
              data={categories}
              columns={effectiveColumns}
              withTableBorder={true}
              withColumnBorders={true}
              storeColumnsKey={TABLE_KEY}
              query={query}
              sort_status={{
                columnAccessor: 'name',
                direction: 'asc',
              }}
              pinLastColumn
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
              onScroll={hideContextMenu}
              onRowContextMenu={({ record, event }) =>
                showContextMenu([
                  {
                    key: 'edit-category',
                    title: 'Edit',
                    icon: <IconEdit size={16} />,
                    color: 'indigo',
                    onClick: () => console.log('edit-company-information'),
                  },
                  { key: 'divider' },
                  {
                    key: 'delete-category',
                    title: 'Delete',
                    icon: <IconTrashX size={16} />,
                    color: 'red',
                    onClick: () => console.log('delete-company'),
                  },
                ])(event)
              }
            />
          </Paper>
        </Stack>
      </Container>
    </PageLayout>
  );
};

AllCategories.layout = (page: any) => <AppShell children={page} />;

export default AllCategories;
