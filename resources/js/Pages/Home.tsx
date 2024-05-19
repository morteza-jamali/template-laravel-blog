import { PageLayout } from '@/Components/Global';
import {
  Header,
  Footer,
  TopStories,
  Subscribe,
  TrendingStories,
  RecentNews,
  EditorsPicks,
} from '@/Components/Blog';

export const Home = () => {
  return (
    <PageLayout title="Home">
      <Header />
      <EditorsPicks />
      <TopStories />
      <TrendingStories />
      <RecentNews />
      <Subscribe />
      <Footer />
    </PageLayout>
  );
};

export default Home;
