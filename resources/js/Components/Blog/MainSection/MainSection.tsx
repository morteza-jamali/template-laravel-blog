import { type ReactNode } from 'react';
import { Container, Grid, Stack, type ContainerProps } from '@mantine/core';
import {
  AdBanner,
  CategoriesBox,
  Subscribe,
  TagsBox,
  type CategoriesBoxProps,
} from '@/Components/Blog';

export interface MainSectionDataProps {
  tags_box?: boolean;
  categories?: CategoriesBoxProps['data'];
}

export interface MainSectionProps extends ContainerProps {
  children: ReactNode;
  data?: MainSectionDataProps;
}

export function MainSection({ children, data, ...rest }: MainSectionProps) {
  return (
    <Container size="lg" {...rest}>
      <Grid gutter="xl">
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            {data?.categories ? <CategoriesBox data={data.categories} /> : null}
            {data?.tags_box ?? true ? <TagsBox /> : null}
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default MainSection;
