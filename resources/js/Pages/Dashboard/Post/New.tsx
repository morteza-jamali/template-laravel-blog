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
  rem,
} from '@mantine/core';
import {
  PageHeader,
  Surface,
  TextEditor,
  AppShell,
} from '@/Components/Dashboard';
import { Head, Link } from '@inertiajs/react';
import { IconCategory, IconTags, IconStackPush } from '@tabler/icons-react';
import UrlPathProvider from '@/Components/UrlPathProvider';
import ROUTES from '@/routes';

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

type NewPostProps = {
  pathname: string;
};

export const NewPost = ({ pathname }: NewPostProps) => {
  const [statusvalue, setStatusValue] = useState('draft');
  const [visibilityvalue, setVisibilityValue] = useState('public');

  return (
    <>
      <Head title={pageTitle} />
      <UrlPathProvider pathname={pathname}>
        <Container fluid>
          <Stack gap="lg">
            <PageHeader title={pageTitle} breadcrumbItems={items} />
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Surface component={Paper} {...PAPER_PROPS} p="md">
                  <Grid gutter={{ base: 5, xs: 'md', md: 'md', lg: 'lg' }}>
                    <Grid.Col span={12}>
                      <Stack>
                        <TextInput
                          label="Title"
                          placeholder="Enter title here"
                        />
                        <TextEditor label="Content" />
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Surface>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Accordion multiple defaultValue={['publish']}>
                  <Stack>
                    <Surface component={Paper} {...PAPER_PROPS}>
                      <Stack gap={0}>
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
                        <Group justify="space-between" py="xs" px="md">
                          <Anchor
                            component="button"
                            c="red.9"
                            underline="never"
                          >
                            Move to Trash
                          </Anchor>
                          <Button variant="filled">Publish</Button>
                        </Group>
                      </Stack>
                    </Surface>

                    <Surface component={Paper} {...PAPER_PROPS}>
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
                        <Accordion.Panel>Content</Accordion.Panel>
                      </Accordion.Item>
                    </Surface>

                    <Surface component={Paper} {...PAPER_PROPS}>
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
                        <Accordion.Panel>Content</Accordion.Panel>
                      </Accordion.Item>
                    </Surface>
                  </Stack>
                </Accordion>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </UrlPathProvider>
    </>
  );
};

NewPost.layout = (page: any) => <AppShell children={page} />;

export default NewPost;
