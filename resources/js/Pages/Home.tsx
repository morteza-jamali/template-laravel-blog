import { PageLayout } from '@/Components/Global';
import {
  Header,
  Footer,
  Section1,
  Subscribe,
  TrendingSection,
} from '@/Components/Blog';

export const Home = () => {
  return (
    <PageLayout title="Home">
      <Header />
      <Section1 />
      <TrendingSection />
      <Subscribe />
      <Footer />
    </PageLayout>
  );
};

export default Home;
