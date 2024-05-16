import { PageLayout } from '@/Components/Global';
import { Header, Footer } from '@/Components/Blog';

export const Home = () => {
  return (
    <PageLayout title="Home">
      <Header />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam recusandae
      esse non, minus corrupti dolorum quos repudiandae sed beatae, praesentium
      laboriosam dicta adipisci atque veniam, quasi eos et quae deleniti?
      <Footer />
    </PageLayout>
  );
};

export default Home;
