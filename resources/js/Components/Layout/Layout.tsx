import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { myTheme } from '@/theme';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={myTheme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
