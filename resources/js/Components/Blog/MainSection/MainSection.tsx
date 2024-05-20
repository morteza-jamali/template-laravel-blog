import { type ReactNode } from 'react';
import { Container, Grid, Stack, type ContainerProps } from '@mantine/core';
import { AdBanner, CategoriesBox, Subscribe, TagsBox } from '@/Components/Blog';

export interface MainSectionProps extends ContainerProps {
  children: ReactNode;
}

export function MainSection({ children, ...rest }: MainSectionProps) {
  return (
    <Container size="lg" {...rest}>
      <Grid gutter="xl">
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            <CategoriesBox />
            <TagsBox />
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default MainSection;
