import { type ReactNode } from 'react';
import { Container, Grid, Stack } from '@mantine/core';
import { AdBanner, CategoriesBox, Subscribe } from '@/Components/Blog';

export interface MainSectionProps {
  children: ReactNode;
}

export function MainSection({ children }: MainSectionProps) {
  return (
    <Container size="lg">
      <Grid gutter="xl">
        <Grid.Col span="auto">{children}</Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <AdBanner type="V1" />
            <CategoriesBox />
            <Subscribe />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default MainSection;
