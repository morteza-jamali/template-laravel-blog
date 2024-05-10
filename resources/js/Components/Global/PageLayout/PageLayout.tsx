import { type ReactNode } from 'react';
import {
  UrlPathProvider,
  type UrlPathProviderProps,
} from '@/Components/Global';
import { Head } from '@inertiajs/react';
import { ColorSchemeScript } from '@mantine/core';

export interface PageLayoutProps {
  children: ReactNode;
  title: string;
  pathname: UrlPathProviderProps['pathname'];
}

export function PageLayout({ children, title, pathname }: PageLayoutProps) {
  return (
    <UrlPathProvider pathname={pathname}>
      <Head title={title} />
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      {children}
    </UrlPathProvider>
  );
}

export default PageLayout;
