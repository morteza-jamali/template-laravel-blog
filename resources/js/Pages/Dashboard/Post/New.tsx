import { useEffect, useState } from 'react';
import {
  Anchor,
  Container,
  Grid,
  Paper,
  PaperProps,
  Stack,
  TextInput,
  Accordion,
  Group,
  Button,
  Radio,
  Tabs,
  Checkbox,
  FileInput,
  ScrollArea,
  TagsInput,
  rem,
  type ComboboxItem,
  Select,
} from '@mantine/core';
import {
  PageHeader,
  Surface,
  TextEditor,
  AppShell,
} from '@/Components/Dashboard';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  IconCategory,
  IconTags,
  IconStackPush,
  IconPhoto,
} from '@tabler/icons-react';
import { type Post, type Category, PartialBy } from '@/types';
import ROUTES from '@/routes';
import { InputLabelWithHelp, PageLayout } from '@/Components/Global';
import {
  useForm,
  type UseFormReturnType,
  isNotEmpty as _isNotEmpty,
  hasLength,
  isInRange,
  matches,
} from '@mantine/form';
import { STRINGS } from '@/i18n';

const PAGE_TITLE: string = 'Add New Post';
const items = [
  { title: 'Dashboard', href: ROUTES.DASHBOARD.HOME },
  { title: 'Posts', href: '#' },
  { title: 'Add New', href: ROUTES.DASHBOARD.POST.NEW },
].map((item, index) => (
  <Anchor href={item.href} key={index} component={Link}>
    {item.title}
  </Anchor>
));

const FIELDS_CONDITIONS = {
  TITLE: {
    MIN: 5,
  },
  SLUG: {
    MIN: 5,
    MAX: 200,
  },
  CATEGORIES: {
    MIN: 0,
  },
};
const PAPER_PROPS: PaperProps = {
  shadow: 'md',
  radius: 'md',
};

const allcategoriesmock = [
  'cat 1',
  'programming',
  'development',
  'computer',
  'physics',
  'chemistry',
  'website',
  'smart phone',
];

interface NewPostProps {
  categories: Array<Pick<Category, 'id' | 'name'>>;
}

interface PublishProps {
  form: UseFormReturnType<FormValuesTypes>;
  loading?: boolean;
}

function Publish({ form, loading }: PublishProps) {
  return (
    <Stack gap={0}>
      <Group justify="space-between" py="xs" px="md">
        <Button
          color="red"
          variant="subtle"
          onClick={() => form.reset()}
          disabled={loading}
        >
          Clear
        </Button>
        <Group justify="space-between" gap="xs">
          <Button variant="default">Preview</Button>
          <Button variant="filled" type="submit" loading={loading}>
            Publish
          </Button>
        </Group>
      </Group>
      <Accordion.Item value="publish">
        <Accordion.Control
          icon={
            <IconStackPush
              style={{
                width: rem(20),
                height: rem(20),
              }}
            />
          }
        >
          Publish
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Radio.Group
              label="Status"
              key={form.key('status')}
              {...form.getInputProps('status')}
            >
              <Group mt="xs">
                <Radio value="draft" label="Draft" />
                <Radio value="publish" label="Published" />
              </Group>
            </Radio.Group>
            {/* <Radio.Group
              name="documentVisibility"
              label="Visibility"
              value={visibilityvalue}
              onChange={setVisibilityValue}
            >
              <Group mt="xs">
                <Radio value="public" label="Public" />
                <Radio value="private" label="Private" />
              </Group>
            </Radio.Group> */}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Stack>
  );
}

type FormValuesTypes = PartialBy<
  Pick<
    Post,
    'title' | 'slug' | 'content' | 'categories' | 'tags' | 'cover' | 'status'
  >,
  'content' | 'tags' | 'cover'
>;

interface CategoriesProps {
  form: UseFormReturnType<FormValuesTypes>;
  data?: ComboboxItem[];
  disabled?: boolean;
}

function Categories({ data, form, disabled }: CategoriesProps) {
  data = data ?? [];

  data.unshift({ value: '0', label: 'None' });

  return (
    <Accordion.Item value="categories">
      <Accordion.Control
        icon={
          <IconCategory
            style={{
              width: rem(20),
              height: rem(20),
            }}
          />
        }
      >
        Categories
      </Accordion.Control>
      <Accordion.Panel>
        <Select
          data={data}
          withScrollArea={false}
          styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
          comboboxProps={{ shadow: 'md' }}
          searchable
          nothingFoundMessage="Nothing found..."
          allowDeselect={false}
          disabled={disabled}
          mt="md"
          key={form.key('parent')}
          {...form.getInputProps('parent')}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function Tags() {
  return (
    <Accordion.Item value="tags">
      <Accordion.Control
        icon={
          <IconTags
            style={{
              width: rem(20),
              height: rem(20),
            }}
          />
        }
      >
        Tags
      </Accordion.Control>
      <Accordion.Panel>
        <TagsInput
          description="Add up to 20 tags"
          placeholder="Enter tag"
          maxTags={20}
          clearable
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function Cover() {
  return (
    <Accordion.Item value="cover">
      <Accordion.Control
        icon={
          <IconPhoto
            style={{
              width: rem(20),
              height: rem(20),
            }}
          />
        }
      >
        Cover
      </Accordion.Control>
      <Accordion.Panel>
        <Tabs defaultValue="url">
          <Tabs.List>
            <Tabs.Tab value="url">URL</Tabs.Tab>
            <Tabs.Tab value="file">File</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="url">
            <TextInput placeholder="Place link here" type="url" />
          </Tabs.Panel>
          <Tabs.Panel value="file">
            <FileInput placeholder="Select file" />
          </Tabs.Panel>
        </Tabs>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export const NewPost = ({ categories }: NewPostProps) => {
  const categories_data = categories.map(({ id, name }) => ({
    value: `${id}`,
    label: name,
  }));
  const isNotEmpty = _isNotEmpty();
  const [loading, setLoading] = useState<boolean>(false);
  const { errors } = usePage().props;
  const form = useForm<FormValuesTypes>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      categories: '',
      slug: '',
      status: 'draft',
    },
    validate: {
      title: (value) => {
        if (isNotEmpty(value) !== null) {
          return STRINGS.REQUIRED_FIELD('title');
        }

        if (hasLength({ min: FIELDS_CONDITIONS.TITLE.MIN })(value) !== null) {
          return STRINGS.MIN_CHAR('title', FIELDS_CONDITIONS.TITLE.MIN);
        }

        return null;
      },
      slug: (value) => {
        if (isNotEmpty(value) !== null) {
          return STRINGS.REQUIRED_FIELD('slug');
        }

        if (matches(/^[a-z0-9]+[a-z0-9\-]*[a-z0-9]$/)(value) !== null) {
          return STRINGS.FORMAT('slug');
        }

        if (hasLength({ min: FIELDS_CONDITIONS.SLUG.MIN })(value) !== null) {
          return STRINGS.MIN_CHAR('slug', FIELDS_CONDITIONS.SLUG.MIN);
        }

        if (hasLength({ max: FIELDS_CONDITIONS.SLUG.MAX })(value) !== null) {
          return STRINGS.MAX_CHAR('slug', FIELDS_CONDITIONS.SLUG.MAX);
        }

        return null;
      },
      categories: (value) =>
        isInRange(
          { min: FIELDS_CONDITIONS.CATEGORIES.MIN },
          STRINGS.MIN_NUM('categories', FIELDS_CONDITIONS.CATEGORIES.MIN),
        )(
          /* FIXME: convert categories string to array */ parseInt(value ?? ''),
        ),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // router.post(ROUTES.DASHBOARD.CATEGORY.NEW, values as unknown as FormData, {
    //   onStart: () => setLoading(true),
    //   onError: (errs) => {
    //     console.log(`[DEBUG]: `, errs);
    //     setLoading(false);
    //   },
    //   onSuccess: () => {
    //     form.reset();
    //     setLoading(false);
    //     notifications.show({
    //       withCloseButton: true,
    //       autoClose: 5000,
    //       title: 'Success',
    //       message: 'Category added',
    //       color: 'green',
    //       icon: <IconCheck />,
    //       withBorder: true,
    //     });
    //   },
    // });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      form.setErrors(errors);
    }
  }, [errors]);

  return (
    <PageLayout title={PAGE_TITLE}>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title={PAGE_TITLE} breadcrumbItems={items} />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Surface component={Paper} {...PAPER_PROPS} p="md">
                  <Grid gutter={{ base: 5, xs: 'md', md: 'md', lg: 'lg' }}>
                    <Grid.Col span={12}>
                      <Stack>
                        <TextInput
                          label={
                            <InputLabelWithHelp
                              help="The title is how it appears on your site"
                              label="Title"
                            />
                          }
                          placeholder="Enter title here"
                          withAsterisk
                          disabled={loading}
                          key={form.key('title')}
                          {...form.getInputProps('title')}
                        />
                        <TextEditor label="Content" />
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Surface>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <ScrollArea type="always" scrollbars="y" offsetScrollbars>
                  <Accordion multiple defaultValue={['publish']}>
                    <Surface component={Paper} {...PAPER_PROPS}>
                      <Publish form={form} loading={loading} />
                      <Categories
                        form={form}
                        data={categories_data}
                        disabled={loading}
                      />
                      <Tags />
                      <Cover />
                    </Surface>
                  </Accordion>
                </ScrollArea>
              </Grid.Col>
            </Grid>
          </form>
        </Stack>
      </Container>
    </PageLayout>
  );
};

NewPost.layout = (page: any) => <AppShell children={page} />;

export default NewPost;
