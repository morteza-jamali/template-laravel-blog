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
} from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
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
  const { showContextMenu } = useContextMenu();
  const [query, setQuery] = useState('');
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
    },
    {
      accessor: 'slug',
    },
    {
      accessor: 'description',
      ellipsis: true,
      width: 200,
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
    },
    {
      accessor: 'updated_at',
      sortable: true,
    },
    {
      accessor: '',
      title: 'Actions',
      width: 100,
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
                href={ROUTES.DASHBOARD.POST.NEW}
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
              columns={columns}
              withTableBorder={true}
              withColumnBorders={true}
              query={query}
              sort_status={{
                columnAccessor: 'name',
                direction: 'asc',
              }}
              pinLastColumn
              onRowContextMenu={({ record, event }) =>
                showContextMenu([
                  {
                    key: 'view-company-details',
                    icon: <IconEdit size={16} />,
                    onClick: () => console.log('view-company-details'),
                  },
                  {
                    key: 'edit-company-information',
                    icon: <IconEdit size={16} />,
                    onClick: () => console.log('edit-company-information'),
                  },
                  { key: 'divider' },
                  {
                    key: 'delete-company',
                    icon: <IconEdit size={16} />,
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
