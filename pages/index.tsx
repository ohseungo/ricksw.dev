import { InferGetStaticPropsType } from "next";
import { BlogPostsProps } from "types/blog";
import RecentPosts from "components/home/RecentPosts";
import { getAllBlogPosts } from "lib/matter-util";
import HomeArea from "components/home/HomeArea";
// InferGetStaticPropsType<typeof getStaticProps>
const Home = ({ posts }: BlogPostsProps) => {
  return (
    <>
      <RecentPosts posts={posts} />
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
