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
  Flex,
  UnstyledButton,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Head, Link } from '@inertiajs/react';
import { PageHeader, AppShell } from '@/Components/Dashboard';
import { DataTable, DataTableProps } from '@/Components/Global';
import {
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconTrashX,
  IconEdit,
} from '@tabler/icons-react';
import ROUTES from '@/routes';

import type { Category } from '@/types';

const PAGE_TITLE = 'All Posts';
const items = [
  { title: 'Dashboard', href: ROUTES.DASHBOARD.HOME },
  { title: 'Posts', href: '#' },
  { title: PAGE_TITLE, href: ROUTES.DASHBOARD.POST.ALL },
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
  console.log(categories);
  console.log(pathname);

  const ICON_SIZE = 18;
  const [query, setQuery] = useState('');
  const columns: DataTableProps<Category>['columns'] = [
    {
      accessor: 'name',
      render: ({ name }) => {
        return (
          <Flex component={UnstyledButton} gap="xs" align="center">
            <Stack gap={1}>
              <Text fw={600}>{name}</Text>
            </Stack>
          </Flex>
        );
      },
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

  return (
    <>
      <Head title={PAGE_TITLE} />
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
            {/* <DataTable
              data={categories}
              columns={columns}
              query={query}
              sort_status={{
                columnAccessor: 'name',
                direction: 'asc',
              }}
            /> */}
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

AllCategories.layout = (page: any) => <AppShell children={page} />;

export default AllCategories;
