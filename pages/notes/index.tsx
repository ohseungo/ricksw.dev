import { PostsProps } from "types/blog";
import { getAllNotePosts } from "lib/matter-util";
import NotePosts from "components/note/NotePosts";
const NotesPage = ({ posts }: PostsProps) => {
  return (
    <div>
      <NotePosts posts={posts} />
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllNotePosts();
  return {
    props: {
      posts,
    },
  };
};
export default NotesPage;
