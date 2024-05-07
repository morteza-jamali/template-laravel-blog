import { MantineProvider } from '@mantine/core';
import { myTheme } from '@/theme';

import type { ReactNode } from 'react';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={myTheme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}

export default RootLayout;
