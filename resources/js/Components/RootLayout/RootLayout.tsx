import type { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { myTheme } from '@/theme';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <MantineProvider theme={myTheme} defaultColorScheme="light">
        <Notifications position="bottom-right" zIndex={1000} />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </>
  );
}

export default RootLayout;
