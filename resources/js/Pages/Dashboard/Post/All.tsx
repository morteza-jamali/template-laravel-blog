import { MouseEventHandler, useEffect, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Avatar,
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
  Modal,
  Mark,
  Badge,
  type ModalBaseProps,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Link, router } from '@inertiajs/react';
import { type VisitOptions } from '@inertiajs/core';
import { PageHeader, AppShell } from '@/Components/Dashboard';
import { PageLayout, ImageZoom } from '@/Components/Global';
import { DataTable, DataTableProps } from '@/Components/Global/DataTable';
import {
  IconPlus,
  IconSearch,
  IconTrashX,
  IconEye,
  IconEdit,
  IconClick,
  IconCheck,
  IconSelectAll,
  IconDeselect,
  IconExclamationCircle,
} from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { useDataTableColumns } from 'mantine-datatable';
import { type CompletePost } from '@/types';
import ROUTES from '@/routes';

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

interface AllPostsProps {
  posts: Array<CompletePost>;
}

interface DeletePostProps {
  id: number | Array<number>;
  onSuccess: VisitOptions['onSuccess'];
  onError: VisitOptions['onError'];
}

const deletePost =
  ({ id, ...options }: DeletePostProps) =>
  () =>
    router.delete(ROUTES.DASHBOARD.POST.ALL, {
      data: {
        id: Array.isArray(id) ? id : [id],
      },
      ...options,
    });

interface DeleteModalProps {
  id: number | Array<number>;
  opened: ModalBaseProps['opened'];
  onClose: ModalBaseProps['onClose'];
  onYesCallback: MouseEventHandler<HTMLElement>;
}

const DeleteModal = ({ id, onYesCallback, ...rest }: DeleteModalProps) => {
  return (
    <Modal.Root centered closeOnClickOutside={false} {...rest}>
      <Modal.Overlay blur={3} backgroundOpacity={0.55} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group gap={6}>
              <IconTrashX color="red" />
              <Text fw={700}>Delete post</Text>
            </Group>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack gap={20}>
            <Text>
              Are you sure you want to delete{' '}
              {Array.isArray(id) ? (
                'all selected posts ?'
              ) : (
                <>
                  post with ID <Mark>{id}</Mark>?
                </>
              )}
            </Text>
            <Group gap={4} justify="flex-end">
              <Button variant="subtle" onClick={rest.onClose}>
                No, I'm not sure
              </Button>
              <Button variant="filled" color="red" onClick={onYesCallback}>
                Yes
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export const AllPosts = ({ posts }: AllPostsProps) => {
  const ICON_SIZE = 18;
  const [delete_id, setDeleteID] = useState<
    CompletePost['id'] | Array<CompletePost['id']>
  >([]);
  const [zoom_img, setZoomImg] = useState<string>();
  const { showContextMenu, hideContextMenu } = useContextMenu();
  const [currentSelectedRecords, setCurrentSelectedRecords] = useState<
    DataTableProps<CompletePost>['data']
  >([]);
  const [allSelectedRecords, setAllSelectedRecords] = useState<
    DataTableProps<CompletePost>['data']
  >([]);
  const [selected_all, setSelectedAll] = useState<boolean>(false);
  const [delete_modal_opened, delete_modal_cb] = useDisclosure(false);
  const image_zoom_disclosure = useDisclosure(false);
  const [_, image_zoom_cb] = image_zoom_disclosure;
  const [query, setQuery] = useState('');
  const TABLE_KEY = 'all-posts-table';
  const columnsSharedProps = {
    resizable: true,
    draggable: true,
  };

  const openModal = (id: CompletePost['id'] | Array<CompletePost['id']>) => {
    const new_id = Array.isArray(id) && id.length === 1 ? id[0] : id;

    setDeleteID(new_id);
    delete_modal_cb.open();
  };

  const toggleAllRecords = () => setSelectedAll(!selected_all);

  useEffect(() => {
    if (allSelectedRecords.length === 0) {
      setSelectedAll(false);

      return;
    }

    if (allSelectedRecords.length === posts.length) {
      setSelectedAll(true);

      return;
    }
  }, [allSelectedRecords]);

  const columns: DataTableProps<CompletePost>['columns'] = [
    {
      accessor: 'id',
      sortable: true,
    },
    {
      accessor: 'title',
      sortable: true,
      filter: (
        <TextInput
          label="Name"
          description="Show Tag whose names include the specified text"
          placeholder="Search tag..."
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
      accessor: 'content',
      ellipsis: true,
      width: 200,
      ...columnsSharedProps,
    },
    {
      accessor: 'tags',
      ...columnsSharedProps,
      render: ({ tags }: CompletePost) => {
        const MAX_TAGS_COUNT = 4;

        return (
          <Group gap={2}>
            {tags.slice(0, MAX_TAGS_COUNT).map((tag) => (
              <Badge
                size="xs"
                variant="dot"
                key={tag.slug}
                component="a"
                href={`${ROUTES.BLOG.TAG.SINGLE}/${tag.id}`}
                style={{ cursor: 'pointer' }}
                target="_blank"
              >
                {tag.name}
              </Badge>
            ))}
            {tags.length > MAX_TAGS_COUNT ? '...' : null}
          </Group>
        );
      },
    },
    {
      accessor: 'categories',
      ...columnsSharedProps,
      render: ({ categories }: CompletePost) => {
        const MAX_CATEGORIES_COUNT = 4;

        return (
          <Group gap={2}>
            {categories.slice(0, MAX_CATEGORIES_COUNT).map((category) => (
              <Badge
                size="xs"
                key={category.slug}
                component="a"
                href={`${ROUTES.BLOG.CATEGORY.SINGLE}/${category.id}`}
                style={{ cursor: 'pointer' }}
                target="_blank"
              >
                {category.name}
              </Badge>
            ))}
            {categories.length > MAX_CATEGORIES_COUNT ? '...' : null}
          </Group>
        );
      },
    },
    {
      accessor: 'status',
      sortable: true,
      ...columnsSharedProps,
      render: ({ status }: CompletePost) => {
        return (
          <Text
            size="sm"
            tt="capitalize"
            c={status === 'draft' ? 'orange' : 'green'}
          >
            {status}
          </Text>
        );
      },
    },
    {
      accessor: 'view',
      sortable: true,
    },
    {
      accessor: 'like',
      sortable: true,
    },
    {
      accessor: 'cover',
      ...columnsSharedProps,
      render: ({ cover }: CompletePost) => {
        return (
          <Avatar
            radius="sm"
            style={{ cursor: 'pointer' }}
            size="lg"
            onClick={() => {
              setZoomImg(cover);
              image_zoom_cb.open();
            }}
            src={cover}
            alt="cover"
          />
        );
      },
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
      render: ({ id }: CompletePost) => {
        return (
          <Group gap="sm" justify="center" wrap="nowrap">
            <Tooltip label="View">
              <ActionIcon
                component="a"
                color="green"
                href={`${ROUTES.BLOG.POST.SINGLE}/${id}`}
                target="_blank"
              >
                <IconEye size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon color="red" onClick={() => openModal(id)}>
                <IconTrashX size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit">
              <ActionIcon
                component="a"
                href={`${ROUTES.DASHBOARD.POST.EDIT}/${id}`}
                target="_blank"
              >
                <IconEdit size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
          </Group>
        );
      },
    },
  ];
  const { effectiveColumns } = useDataTableColumns<CompletePost>({
    key: TABLE_KEY,
    columns,
  });

  return (
    <PageLayout title={PAGE_TITLE}>
      <ImageZoom disclosure={image_zoom_disclosure} src={zoom_img} />
      <DeleteModal
        id={delete_id}
        onClose={delete_modal_cb.close}
        opened={delete_modal_opened}
        onYesCallback={deletePost({
          id: delete_id,
          onError: (error) => {
            notifications.show({
              withCloseButton: true,
              autoClose: 5000,
              title: 'Error',
              message: JSON.stringify(error),
              color: 'red',
              icon: <IconExclamationCircle />,
              withBorder: true,
            });
          },
          onSuccess: () => {
            setCurrentSelectedRecords([]);
            delete_modal_cb.close();
            notifications.show({
              withCloseButton: true,
              autoClose: 5000,
              title: 'Success',
              message: Array.isArray(delete_id)
                ? 'All selected posts deleted'
                : `Post with ID ${delete_id} deleted`,
              color: 'green',
              icon: <IconCheck />,
              withBorder: true,
            });
          },
        })}
      />
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
              <Text>
                {allSelectedRecords.length === 0
                  ? 'No'
                  : allSelectedRecords.length === posts.length
                    ? `All`
                    : allSelectedRecords.length}{' '}
                posts selected
              </Text>
              <Button.Group>
                <Button
                  size="compact-md"
                  variant="light"
                  color="red"
                  leftSection={<IconTrashX size={16} />}
                  disabled={allSelectedRecords.length === 0}
                  onClick={() =>
                    openModal(allSelectedRecords.map(({ id }) => id))
                  }
                >
                  Delete All
                </Button>
                <Button
                  size="compact-md"
                  variant="light"
                  color="blue"
                  leftSection={
                    selected_all ? (
                      <IconDeselect size={16} />
                    ) : (
                      <IconSelectAll size={16} />
                    )
                  }
                  onClick={toggleAllRecords}
                  disabled={posts.length === 0}
                  ml={5}
                  tt="capitalize"
                >
                  {(selected_all ? 'de' : '') + 'select All'}
                </Button>
              </Button.Group>
            </Group>
            <DataTable
              striped
              highlightOnHover
              minHeight={200}
              verticalSpacing="xs"
              data={posts}
              columns={effectiveColumns}
              withTableBorder={true}
              withColumnBorders={true}
              storeColumnsKey={TABLE_KEY}
              selectedRecords={currentSelectedRecords}
              onSelectedRecordsChange={setCurrentSelectedRecords}
              setAllSelectedRecords={setAllSelectedRecords}
              selectedAll={selected_all}
              selectionTrigger="cell"
              query={query}
              sort_status={{
                columnAccessor: 'title',
                direction: 'asc',
              }}
              pinLastColumn
              filterFn={(debouncedQuery) =>
                ({ title }) => {
                  if (
                    debouncedQuery !== '' &&
                    !(title as string)
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
                    key: 'edit-post',
                    title: 'Edit',
                    icon: <IconEdit size={16} />,
                    color: 'indigo',
                    onClick: () =>
                      router.visit(
                        `${ROUTES.DASHBOARD.POST.EDIT}/${record.id}`,
                      ),
                  },
                  { key: 'divider' },
                  {
                    key: 'delete-post',
                    title: 'Delete',
                    icon: <IconTrashX size={16} />,
                    color: 'red',
                    onClick: () => openModal(record.id),
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

AllPosts.layout = (page: any) => <AppShell children={page} />;

export default AllPosts;
