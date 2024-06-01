import {
  ParentLayout,
  MainSection,
  Breadcrumbs,
  AllCategories,
} from '@/Components/Blog';
import { Container, Title } from '@mantine/core';

const PAGE_TITLE = 'All Categories';
const breadcrumbs = [{ title: 'Home', href: '/' }, { title: PAGE_TITLE }];

export function SingleCategory() {
  return (
    <ParentLayout title={PAGE_TITLE}>
      <Container size="lg">
        <Breadcrumbs items={breadcrumbs} />
        <Title order={2} my="xl">
          {PAGE_TITLE}
        </Title>
      </Container>
      <MainSection>
        <AllCategories />
      </MainSection>
    </ParentLayout>
  );
}

export default SingleCategory;
