import { ParentLayout, MainSection, Breadcrumbs } from '@/Components/Blog';
import { Container, Group, Title } from '@mantine/core';

const breadcrumbs = [
  { title: 'Home', href: '/' },
  { title: 'Categories', href: '#' },
  { title: 'Category name', href: '#' },
];

export function SingleCategory() {
  return (
    <ParentLayout title="Category name">
      <Container size="lg">
        <Breadcrumbs items={breadcrumbs} />
        <Title order={2} my="xl">
          Category name
        </Title>
      </Container>
      <MainSection>
        <Group
          justify="space-between"
          wrap="nowrap"
          align="flex-start"
          gap="xl"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, fugiat
          minima ducimus molestias culpa non ipsum similique inventore quae,
          minus hic asperiores vero ratione iusto eaque, adipisci soluta harum
          aut.
        </Group>
      </MainSection>
    </ParentLayout>
  );
}

export default SingleCategory;
