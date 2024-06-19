import { type ReactNode } from 'react';
import { Container, Grid, Stack, type ContainerProps } from '@mantine/core';
import { AdBanner, CategoriesBox, Subscribe, TagsBox } from '@/Components/Blog';

export interface MainSectionProps extends ContainerProps {
  children: ReactNode;
  tags_box?: boolean;
  categories_box?: boolean;
}

export function MainSection({
  children,
  tags_box,
  categories_box,
  ...rest
}: MainSectionProps) {
  return (
    <Container size="lg" {...rest}>
      <Grid gutter="xl">
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            {categories_box ?? true ? <CategoriesBox /> : null}
            {tags_box ?? true ? <TagsBox /> : null}
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default MainSection;
