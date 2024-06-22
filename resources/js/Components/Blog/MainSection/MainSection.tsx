import { type ReactNode } from 'react';
import { Container, Grid, Stack, type ContainerProps } from '@mantine/core';
import {
  AdBanner,
  CategoriesBox,
  Subscribe,
  TagsBox,
  type CategoriesBoxProps,
  type TagsBoxProps,
} from '@/Components/Blog';

export interface MainSectionProps extends ContainerProps {
  children: ReactNode;
  tags?: TagsBoxProps;
  categories?: CategoriesBoxProps;
}

export function MainSection({
  children,
  tags,
  categories,
  ...rest
}: MainSectionProps) {
  return (
    <Container size="lg" {...rest}>
      <Grid gutter="xl">
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            {categories ? <CategoriesBox {...categories} /> : null}
            {tags ? <TagsBox {...tags} /> : null}
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default MainSection;
