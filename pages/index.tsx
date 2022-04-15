import { InferGetStaticPropsType } from "next";
import { BlogPostsProps } from "types/blog";
import BlogPosts from "components/blog/BlogPosts";
import { getAllBlogPosts } from "lib/matter-util";
// InferGetStaticPropsType<typeof getStaticProps>
const Home = ({ posts }: BlogPostsProps) => {
  return (
    <>
      <BlogPosts posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: {
      posts,
    },
  };
};
export default Home;
