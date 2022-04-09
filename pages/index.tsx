import { InferGetStaticPropsType } from "next";
import { PostsProps } from "types/blog";
import BlogPosts from "components/blog/BlogPosts";
import { getAllPosts } from "lib/matter-util";
// InferGetStaticPropsType<typeof getStaticProps>
const Home = ({ posts }: PostsProps) => {
  return (
    <>
      <BlogPosts posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
export default Home;
