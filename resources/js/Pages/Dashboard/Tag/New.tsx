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
  Textarea,
} from '@mantine/core';
import { PageHeader, Surface, AppShell } from '@/Components/Dashboard';
import { Head, Link } from '@inertiajs/react';
import { UrlPathProvider, InputLabelWithHelp } from '@/Components/Global';
import ROUTES from '@/routes';

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

const PAPER_PROPS: PaperProps = {
  shadow: 'md',
  radius: 'md',
};

type NewPostProps = {
  pathname: string;
};

function Publish() {
  return (
    <Group justify="space-between" py="xs" px="md">
      <Anchor component="button" c="red.9" underline="never">
        Move to Trash
      </Anchor>
      <Button variant="filled">Add</Button>
    </Group>
  );
}

export const NewCategory = ({ pathname }: NewPostProps) => {
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
                          label={
                            <InputLabelWithHelp
                              help="The name is how it appears on your site"
                              label="Name"
                            />
                          }
                          placeholder="Enter title here"
                          withAsterisk
                        />
                        <TextInput
                          label={
                            <InputLabelWithHelp
                              help="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens"
                              label="Slug"
                            />
                          }
                          placeholder="Enter slug here"
                        />
                        <Textarea
                          label="Description"
                          placeholder="Enter description here"
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
                      <Publish />
                    </Surface>
                  </Accordion>
                </ScrollArea>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </UrlPathProvider>
    </>
  );
};

NewCategory.layout = (page: any) => <AppShell children={page} />;

export default NewCategory;
