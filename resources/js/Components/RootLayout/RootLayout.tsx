import type { ReactNode } from 'react';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core';
import { myTheme } from '@/theme';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={myTheme} defaultColorScheme="light">
      <Notifications position="bottom-right" zIndex={1000} />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}

export default RootLayout;
