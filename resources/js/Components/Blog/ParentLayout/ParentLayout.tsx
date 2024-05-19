import { PageLayout, type PageLayoutProps } from '@/Components/Global';
import { Footer, Header } from '@/Components/Blog';

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
