import { type ReactNode, useEffect, useState, type DOMAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import {
  Anchor,
  Container,
  Grid,
  Paper,
  PaperProps,
  Stack,
  TextInput,
  Text,
  Accordion,
  Group,
  Button,
  Radio,
  Image,
  ScrollArea,
  TagsInput,
  rem,
  MultiSelect,
  type ComboboxItem,
  type ImageProps,
  type ModalBaseProps,
  Modal,
} from '@mantine/core';
import {
  PageHeader,
  Surface,
  TextEditor,
  AppShell,
} from '@/Components/Dashboard';
import { Link, router, usePage } from '@inertiajs/react';
import {
  IconCategory,
  IconTags,
  IconStackPush,
  IconPhoto,
  IconTableImport,
  IconCheck,
} from '@tabler/icons-react';
import {
  type Category,
  type PartialBy,
  type CompletePost,
  type Tag,
} from '@/types';
import ROUTES from '@/routes';
import {
  InputLabelWithHelp,
  PageLayout,
  Asterisk,
  ImageZoom,
} from '@/Components/Global';
import {
  useForm,
  isNotEmpty as _isNotEmpty,
  hasLength,
  matches,
  type UseFormReturnType,
} from '@mantine/form';
import { STRINGS } from '@/i18n';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import * as lodash from 'lodash';

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
    MIN: 1,
    MAX: 3,
  },
  TAGS: {
    MAX: 20,
  },
};
const PAPER_PROPS: PaperProps = {
  shadow: 'md',
  radius: 'md',
};

interface EditPostProps {
  post: CompletePost;
  categories: Array<Category>;
  tags: Array<Tag>;
}

interface PublishProps {
  form: UseFormReturnType<FormValuesTypes>;
  onPreview: () => void;
  loading?: boolean;
}

function Publish({ form, loading, onPreview }: PublishProps) {
  return (
    <Stack gap={0}>
      <Group justify="space-between" py="xs" px="md">
        <Button
          color="red"
          variant="subtle"
          onClick={() => form.reset()}
          disabled={loading}
        >
          Reset
        </Button>
        <Group justify="space-between" gap="xs">
          <Button variant="default" onClick={onPreview}>
            Preview
          </Button>
          <Button variant="filled" type="submit" loading={loading}>
            Update
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
          <Asterisk>Publish</Asterisk>
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
    CompletePost,
    'title' | 'slug' | 'content' | 'categories' | 'tags' | 'cover' | 'status'
  >,
  'content' | 'tags' | 'cover'
>;

interface CategoriesProps {
  form: UseFormReturnType<FormValuesTypes>;
  data?: Array<ComboboxItem>;
  disabled?: boolean;
}

function Categories({ data, form, disabled }: CategoriesProps) {
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
        <Asterisk>Categories</Asterisk>
      </Accordion.Control>
      <Accordion.Panel>
        <MultiSelect
          data={data}
          withScrollArea={false}
          styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
          comboboxProps={{ shadow: 'md' }}
          description={`Select up to ${FIELDS_CONDITIONS.CATEGORIES.MAX} categories`}
          hidePickedOptions
          searchable
          nothingFoundMessage="Nothing found..."
          disabled={disabled}
          maxValues={FIELDS_CONDITIONS.CATEGORIES.MAX}
          key={form.key('categories')}
          {...form.getInputProps('categories')}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}

interface TagsProps {
  form: UseFormReturnType<FormValuesTypes>;
  data?: ComboboxItem[];
  disabled?: boolean;
}

function Tags({ form, data, disabled }: TagsProps) {
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
          description={`Add up to ${FIELDS_CONDITIONS.TAGS.MAX} tags`}
          maxTags={FIELDS_CONDITIONS.TAGS.MAX}
          data={data}
          clearable
          withScrollArea={false}
          styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
          comboboxProps={{ shadow: 'md' }}
          disabled={disabled}
          key={form.key('tags')}
          {...form.getInputProps('tags')}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}

interface CoverPreviewProps
  extends Pick<ImageProps, 'src' | 'onError'>,
    Pick<DOMAttributes<HTMLImageElement>, 'onClick'> {}

const CoverPreview = (props: CoverPreviewProps) => {
  return (
    <Image
      mt="xs"
      w="auto"
      fit="contain"
      height={200}
      mx="auto"
      fallbackSrc="/images/postcoverplaceholder.svg"
      style={{ cursor: 'pointer' }}
      {...props}
    />
  );
};

interface CoverProps {
  form: UseFormReturnType<FormValuesTypes>;
  disabled?: boolean;
  preview?: ReactNode;
}

function Cover({ form, disabled, preview }: CoverProps) {
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
        <TextInput
          placeholder="Place link here"
          disabled={disabled}
          key={form.key('cover')}
          {...form.getInputProps('cover')}
        />
        {preview}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

interface SaveModalProps {
  opened: ModalBaseProps['opened'];
  onClose: ModalBaseProps['onClose'];
  onYesCallback: () => void;
}

const SaveModal = ({ onYesCallback, ...rest }: SaveModalProps) => {
  return (
    <Modal.Root centered closeOnClickOutside={false} {...rest}>
      <Modal.Overlay blur={3} backgroundOpacity={0.55} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group gap={6}>
              <IconTableImport color="green" />
              <Text fw={700}>Save post</Text>
            </Group>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack gap={20}>
            <Text>Are you sure you want to save the post ?</Text>
            <Group gap={4} justify="flex-end">
              <Button variant="subtle" onClick={rest.onClose}>
                No, I'm not sure
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  onYesCallback();
                  rest.onClose();
                }}
              >
                Yes
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export const EditPost = ({ categories, tags, post }: EditPostProps) => {
  const new_post_object = { ...post };

  new_post_object.categories = post.categories.map(({ name }) => name) as any;

  const added_tags_initial = post.tags?.map(({ id, name }) => ({
    value: `${id}`,
    label: name,
  }));

  if (post.tags) {
    new_post_object.tags = post.tags.map(({ name }) => name) as any;
  }

  const categories_data = categories.map(({ id, name }) => ({
    value: `${id}`,
    label: name,
  }));
  const tags_data = tags.map(({ id, name }) => ({
    value: `${id}`,
    label: name,
  }));
  const isNotEmpty = _isNotEmpty();
  const [loading, setLoading] = useState<boolean>(false);
  const [cover_preview_src, setCoverPreviewSrc] = useState<string | undefined>(
    new_post_object.cover,
  );
  const [added_tags, setAddedTags] = useState<Array<ComboboxItem>>(
    added_tags_initial ?? [],
  );
  const [save_modal_opened, save_modal_cb] = useDisclosure(false);
  const image_zoom_disclosure = useDisclosure(false);
  const [_, image_zoom_cb] = image_zoom_disclosure;
  const { errors } = usePage().props;
  const form = useForm<FormValuesTypes>({
    mode: 'uncontrolled',
    initialValues: {
      title: new_post_object.title,
      categories: new_post_object.categories,
      slug: new_post_object.slug,
      status: new_post_object.status,
      content: new_post_object.content,
      cover: new_post_object.cover,
      tags: new_post_object.tags ?? [],
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
      categories: hasLength(
        {
          min: FIELDS_CONDITIONS.CATEGORIES.MIN,
        },
        STRINGS.REQUIRED_FIELD('categories'),
      ),
      content: (value, { status }) => {
        if (status === 'publish' && !value) {
          return STRINGS.REQUIRED_FIELD('content');
        }

        return null;
      },
      cover: (): string | null =>
        form.errors.cover === undefined ? null : STRINGS.BAD_IMAGE_URL,
    },
  });

  // FIXME: implement on reset handler
  form.watch('tags', ({ value }) => {
    const new_value = value?.map(
      (tag) =>
        tags_data.find((t) => t.label === (tag as unknown as string)) ?? {
          value: '',
          label: tag,
        },
    );

    setAddedTags(new_value as Array<ComboboxItem>);
  });

  // FIXME: implement on reset handler
  form.watch('cover', ({ value }) => setCoverPreviewSrc(value));

  // FIXME: This method dosn't work for categories that their names are number
  const fixCategories = (categories: Array<Category>) => {
    const _categories = [...categories];

    new_post_object.categories.forEach((category) => {
      if (categories.includes(category)) {
        _categories[categories.indexOf(category)] = String(
          post.categories.filter(({ name }) => name === (category as any))[0]
            .id,
        ) as any;
      }
    });

    return _categories;
  };

  const previewHandler = () => {
    if (!form.validate().hasErrors) {
      const storage_key = `preview-post-${uuidv4()}`;
      const form_values = { ...form.getValues() };

      if (form_values.tags) {
        form_values.tags = added_tags as any;
      }

      if ((form_values.tags as Array<Tag>)?.length === 0) {
        delete form_values.tags;
      }

      form_values.categories = fixCategories(form_values.categories);

      const storage_value = JSON.stringify({
        ...lodash.pick(post, ['like', 'view', 'created_at']),
        ...form_values,
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
      localStorage.setItem(storage_key, storage_value);

      window.open(
        `${ROUTES.DASHBOARD.POST.PREVIEW}?id=${storage_key}`,
        '_blank',
        'noreferrer',
      );
    }
  };

  const handleSubmit = () => {
    const values = { ...form.getValues() };

    if (values.tags?.length === 0) {
      delete values.tags;
    }

    if (values.tags) {
      values.tags = added_tags as any;
    }

    values.categories = fixCategories(values.categories);

    router.patch(
      `${ROUTES.DASHBOARD.POST.EDIT}/${new_post_object.id}`,
      values as unknown as FormData,
      {
        onStart: () => setLoading(true),
        onError: (errs) => {
          console.log(`[DEBUG]: `, errs);
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: 'Success',
            message: 'Post saved',
            color: 'green',
            icon: <IconCheck />,
            withBorder: true,
          });
        },
      },
    );
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      form.setErrors(errors);
    }
  }, [errors]);

  return (
    <PageLayout title={PAGE_TITLE}>
      <ImageZoom src={cover_preview_src} disclosure={image_zoom_disclosure} />
      <SaveModal
        onClose={save_modal_cb.close}
        opened={save_modal_opened}
        onYesCallback={handleSubmit}
      />
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title={PAGE_TITLE} breadcrumbItems={items} />
          <form onSubmit={form.onSubmit(() => save_modal_cb.open())}>
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
                        <TextInput
                          label={
                            <InputLabelWithHelp
                              help="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens"
                              label="Slug"
                            />
                          }
                          placeholder="Enter slug here"
                          withAsterisk
                          disabled={loading}
                          key={form.key('slug')}
                          {...form.getInputProps('slug')}
                        />
                        <TextEditor
                          label="Content"
                          withAsterisk
                          placeholder="Enter content here"
                          disabled={loading}
                          {...form.getInputProps('content')}
                          key={form.key('content')}
                        />
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Surface>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <ScrollArea type="always" scrollbars="y" offsetScrollbars>
                  <Accordion multiple defaultValue={['publish', 'categories']}>
                    <Surface component={Paper} {...PAPER_PROPS}>
                      <Publish
                        onPreview={previewHandler}
                        form={form}
                        loading={loading}
                      />
                      <Categories
                        form={form}
                        data={categories_data}
                        disabled={loading}
                      />
                      <Tags form={form} data={tags_data} disabled={loading} />
                      <Cover
                        form={form}
                        disabled={loading}
                        preview={
                          <CoverPreview
                            src={cover_preview_src}
                            onClick={() =>
                              cover_preview_src?.trim().length !== 0 &&
                              form.errors.cover === undefined &&
                              image_zoom_cb.open()
                            }
                            onError={() =>
                              form.setFieldError('cover', STRINGS.BAD_IMAGE_URL)
                            }
                          />
                        }
                      />
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

EditPost.layout = (page: any) => <AppShell children={page} />;

export default EditPost;
