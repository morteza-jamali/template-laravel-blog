import { Container, Grid, SimpleGrid, rem } from '@mantine/core';
import { CardImageBG, CardImageBG2 } from '@/Components/Blog';

const PRIMARY_COL_HEIGHT = rem(500);

export function Section1() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" size="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <CardImageBG2 h={PRIMARY_COL_HEIGHT} />
        <Grid gutter="md">
          <Grid.Col>
            <CardImageBG h={SECONDARY_COL_HEIGHT} />
          </Grid.Col>
          <Grid.Col>
            <CardImageBG h={SECONDARY_COL_HEIGHT} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

export default Section1;
