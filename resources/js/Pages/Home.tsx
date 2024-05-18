import { PageLayout } from '@/Components/Global';
import {
  Header,
  Footer,
  TopStories,
  Subscribe,
  TrendingStories,
  RecentNews,
} from '@/Components/Blog';

export const Home = () => {
  return (
    <PageLayout title="Home">
      <Header />
      <RecentNews />
      <TopStories />
      <TrendingStories />
      <Subscribe />
      <Footer />
    </PageLayout>
  );
};

export default Home;
