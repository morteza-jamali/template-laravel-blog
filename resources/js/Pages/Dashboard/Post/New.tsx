import { useState } from 'react';
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
} from '@mantine/core';
import {
  PageHeader,
  Surface,
  TextEditor,
  AppShell,
} from '@/Components/Dashboard';
import { Head, Link } from '@inertiajs/react';
import {
  IconCategory,
  IconTags,
  IconStackPush,
  IconPhoto,
} from '@tabler/icons-react';
import ROUTES from '@/routes';
import { PageLayout } from '@/Components/Global';

const pageTitle: string = 'Add New Post';
const items = [
  { title: 'Dashboard', href: ROUTES.DASHBOARD.HOME },
  { title: 'Posts', href: '#' },
  { title: 'Add New', href: ROUTES.DASHBOARD.POST.NEW },
].map((item, index) => (
  <Anchor href={item.href} key={index} component={Link}>
    {item.title}
  </Anchor>
));

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

type NewPostProps = {
  pathname: string;
};

function Publish() {
  const [statusvalue, setStatusValue] = useState('draft');
  const [visibilityvalue, setVisibilityValue] = useState('public');

  return (
    <Stack gap={0}>
      <Group justify="space-between" py="xs" px="md">
        <Anchor component="button" c="red.9" underline="never">
          Move to Trash
        </Anchor>
        <Button variant="filled">Publish</Button>
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
            <Group justify="space-between">
              <Button variant="default">Save Draft</Button>
              <Button variant="default">Preview</Button>
            </Group>
            <Radio.Group
              name="documentStatus"
              label="Status"
              value={statusvalue}
              onChange={setStatusValue}
            >
              <Group mt="xs">
                <Radio value="draft" label="Draft" />
                <Radio value="published" label="Published" />
              </Group>
            </Radio.Group>
            <Radio.Group
              name="documentVisibility"
              label="Visibility"
              value={visibilityvalue}
              onChange={setVisibilityValue}
            >
              <Group mt="xs">
                <Radio value="public" label="Public" />
                <Radio value="private" label="Private" />
              </Group>
            </Radio.Group>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Stack>
  );
}

function Categories() {
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
        <Stack gap={0}>
          <Tabs defaultValue="allcategories">
            <Tabs.List>
              <Tabs.Tab value="allcategories">All Categories</Tabs.Tab>
              <Tabs.Tab value="mostused">Most Used</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="allcategories">
              {allcategoriesmock.map((catitem, key) => (
                <Checkbox label={catitem} key={key} my={2} />
              ))}
            </Tabs.Panel>
            <Tabs.Panel value="mostused">
              {allcategoriesmock.map((catitem, key) => (
                <Checkbox label={catitem} key={key} my={2} />
              ))}
            </Tabs.Panel>
          </Tabs>
          <Group justify="flex-start">
            <Anchor component="button" underline="never">
              + Add New Category
            </Anchor>
          </Group>
        </Stack>
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

export const NewPost = ({ pathname }: NewPostProps) => {
  return (
    <PageLayout title={pageTitle}>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title={pageTitle} breadcrumbItems={items} />
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Surface component={Paper} {...PAPER_PROPS} p="md">
                <Grid gutter={{ base: 5, xs: 'md', md: 'md', lg: 'lg' }}>
                  <Grid.Col span={12}>
                    <Stack>
                      <TextInput label="Title" placeholder="Enter title here" />
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
                    <Publish />
                    <Categories />
                    <Tags />
                    <Cover />
                  </Surface>
                </Accordion>
              </ScrollArea>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </PageLayout>
  );
};

NewPost.layout = (page: any) => <AppShell children={page} />;

export default NewPost;
