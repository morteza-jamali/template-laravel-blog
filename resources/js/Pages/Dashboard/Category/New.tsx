import { useEffect } from 'react';
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
  ScrollArea,
  Select,
  Textarea,
  UnstyledButton,
  rem,
} from '@mantine/core';
import {
  useForm,
  UseFormReturnType,
  isNotEmpty as _isNotEmpty,
  hasLength,
  isInRange,
  matches,
} from '@mantine/form';
import { PageHeader, Surface, AppShell } from '@/Components/Dashboard';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { IconCategory2 } from '@tabler/icons-react';
import { UrlPathProvider, InputLabelWithHelp } from '@/Components/Global';
import ROUTES from '@/routes';
import { STRINGS } from '@/i18n';
import { gParentCategories } from '@/faker/ParentCategories';

import type { ComboboxItem } from '@mantine/core';

const pageTitle: string = 'Add New Category';
const items = [
  { title: 'Dashboard', href: ROUTES.DASHBOARD.HOME },
  { title: 'Categories', href: '#' },
  { title: 'Add New', href: ROUTES.DASHBOARD.CATEGORY.NEW },
].map((item, index) => (
  <Anchor href={item.href} key={index} component={Link}>
    {item.title}
  </Anchor>
));

const FIELDS_CONDITIONS = {
  NAME: {
    MIN: 5,
  },
  SLUG: {
    MIN: 5,
    MAX: 200,
  },
  PARENT: {
    MIN: 0,
  },
};
const PAPER_PROPS: PaperProps = {
  shadow: 'md',
  radius: 'md',
};

interface NewPostProps {
  pathname: string;
}

interface FormValuesTypes {
  name: string;
  slug?: string;
  description?: string;
  parent?: string;
}

interface PublishProps {
  form: UseFormReturnType<FormValuesTypes>;
}

function Publish({ form }: PublishProps) {
  return (
    <Group justify="space-between" py="xs" px="md">
      <UnstyledButton c="red.9" onClick={() => form.reset()}>
        Clear
      </UnstyledButton>
      <Button variant="filled" type="submit">
        Add
      </Button>
    </Group>
  );
}

interface ParentCategoryProps {
  form: UseFormReturnType<FormValuesTypes>;
  data?: ComboboxItem[];
}

function ParentCategory({ data, form }: ParentCategoryProps) {
  data = data ?? [];

  data.unshift({ value: '0', label: 'None' });

  return (
    <Accordion.Item value="parent">
      <Accordion.Control
        icon={
          <IconCategory2
            style={{
              width: rem(20),
              height: rem(20),
            }}
          />
        }
      >
        Parent Category
      </Accordion.Control>
      <Accordion.Panel>
        <Select
          data={data}
          withScrollArea={false}
          styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
          searchable
          nothingFoundMessage="Nothing found..."
          allowDeselect={false}
          mt="md"
          key={form.key('parent')}
          {...form.getInputProps('parent')}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export const NewCategory = ({ pathname }: NewPostProps) => {
  const isNotEmpty = _isNotEmpty();
  const { errors } = usePage().props;
  const form = useForm<FormValuesTypes>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      parent: '0',
    },
    validate: {
      name: (value) => {
        if (isNotEmpty(value) !== null) {
          return STRINGS.REQUIRED_FIELD('name');
        }

        if (hasLength({ min: FIELDS_CONDITIONS.NAME.MIN })(value) !== null) {
          return STRINGS.MIN_CHAR('name', FIELDS_CONDITIONS.NAME.MIN);
        }

        return null;
      },
      slug: (value) => {
        if (isNotEmpty(value) !== null) {
          return STRINGS.REQUIRED_FIELD('slug');
        }

        if (matches(/^(\w|\d)+[\w\d\-]*(\w|\d)$/)(value) !== null) {
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
      parent: (value) =>
        isInRange(
          { min: FIELDS_CONDITIONS.PARENT.MIN },
          STRINGS.MIN_NUM('parent', FIELDS_CONDITIONS.PARENT.MIN),
        )(parseInt(value ?? '')),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    router.post('/dashboard/category/new', values as unknown as FormData);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      form.setErrors(errors);
    }
  }, [errors]);

  return (
    <>
      <Head title={pageTitle} />
      <UrlPathProvider pathname={pathname}>
        <Container fluid>
          <Stack gap="lg">
            <PageHeader title={pageTitle} breadcrumbItems={items} />
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
                                help="The name is how it appears on your site"
                                label="Name"
                              />
                            }
                            placeholder="Enter title here"
                            withAsterisk
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                          />
                          <TextInput
                            label={
                              <InputLabelWithHelp
                                help="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens"
                                label="Slug"
                              />
                            }
                            placeholder="Enter slug here"
                            key={form.key('slug')}
                            {...form.getInputProps('slug')}
                          />
                          <Textarea
                            label="Description"
                            placeholder="Enter description here"
                            key={form.key('description')}
                            {...form.getInputProps('description')}
                          />
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Surface>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <ScrollArea type="always" scrollbars="y" offsetScrollbars>
                    <Accordion multiple defaultValue={['parent']}>
                      <Surface component={Paper} {...PAPER_PROPS}>
                        <Publish form={form} />
                        <ParentCategory
                          form={form}
                          data={gParentCategories(50)}
                        />
                      </Surface>
                    </Accordion>
                  </ScrollArea>
                </Grid.Col>
              </Grid>
            </form>
          </Stack>
        </Container>
      </UrlPathProvider>
    </>
  );
};

NewCategory.layout = (page: any) => <AppShell children={page} />;

export default NewCategory;
