import {
  ParentLayout,
  MainSection,
  PostHeader,
  PostAuthor,
} from '@/Components/Blog';

export function SinglePost() {
  return (
    <ParentLayout title="My post title">
      <PostHeader mb={60} />
      <MainSection>
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          explicabo vitae unde nostrum labore repellendus facere maiores?
          Facere, officia. Aperiam, esse est et officiis eligendi temporibus
          iure nihil veniam. Temporibus!
        </h1>
        <PostAuthor />
      </MainSection>
    </ParentLayout>
  );
}

export default SinglePost;
