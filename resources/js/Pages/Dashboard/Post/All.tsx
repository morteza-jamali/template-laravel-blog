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
} from '@mantine/core';
import { Head, Link } from '@inertiajs/react';
import { InvoicesTable, PageHeader, AppShell } from '@/Components/Dashboard';
import InvoicesData from '@/mocks/Invoices.json';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
// import { Metadata } from 'next';
import ROUTES from '@/routes';
import { useFetchData } from '@/hooks';
import { PageLayout } from '@/Components/Global';

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

export const AllPosts = () => {
  const {
    data: invoicesData,
    loading: invoicesLoading,
    error: invoicesError,
  } = useFetchData('/mocks/Invoices.json');

  return (
    <PageLayout title={PAGE_TITLE}>
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
            <InvoicesTable
              data={invoicesData}
              error={invoicesError}
              loading={invoicesLoading}
            />
          </Paper>
        </Stack>
      </Container>
    </PageLayout>
  );
};

AllPosts.layout = (page: any) => <AppShell children={page} />;

export default AllPosts;
