import { getAllNotePosts } from "lib/matter-util";
import { NotePostsProps } from "types/blog";
import NotePosts from "components/note/NotePosts";

const NotesPage = ({ posts }: NotePostsProps) => {
  console.log(posts);
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
