import { type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { ColorSchemeScript } from '@mantine/core';

export interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <>
      <Head title={title} />
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      {children}
    </>
  );
}

export default PageLayout;
