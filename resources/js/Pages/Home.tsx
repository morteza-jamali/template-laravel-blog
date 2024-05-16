import { PageLayout } from '@/Components/Global';
import { Header, Footer, Section1, Subscribe } from '@/Components/Blog';

export const Home = () => {
  return (
    <PageLayout title="Home">
      <Header />
      <Section1 />
      <Subscribe />
      <Footer />
    </PageLayout>
  );
};

export default Home;
