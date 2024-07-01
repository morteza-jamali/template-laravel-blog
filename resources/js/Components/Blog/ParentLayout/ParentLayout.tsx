import { PageLayout, type PageLayoutProps } from '@/Components/Global';
import { Footer, Header } from '@/Components/Blog';
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';

hljs.highlightAll();

export interface ParentLayoutProps extends PageLayoutProps {}

export function ParentLayout({ title, children }: ParentLayoutProps) {
  return (
    <PageLayout title={title}>
      <Header />
      {children}
      <Footer />
    </PageLayout>
  );
}

export default ParentLayout;
