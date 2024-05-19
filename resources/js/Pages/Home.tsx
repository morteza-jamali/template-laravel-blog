import { PageLayout } from '@/Components/Global';
import {
  Header,
  Footer,
  TopStories,
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
      <Footer />
    </PageLayout>
  );
};

export default Home;
