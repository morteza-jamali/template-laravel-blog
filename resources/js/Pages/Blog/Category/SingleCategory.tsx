import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  CategoryPosts,
} from '@/Components/Blog';
import { Container, Title } from '@mantine/core';

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
        <CategoryPosts />
      </MainSection>
    </ParentLayout>
  );
}

export default SingleCategory;
