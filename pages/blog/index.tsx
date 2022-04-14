import { BlogPostsProps } from "types/blog";
import BlogPosts from "components/blog/BlogPosts";
import { getAllBlogPosts } from "lib/matter-util";
import BlogContainer from "container/BlogContainer";
const BlogPage = ({ posts }: BlogPostsProps) => {
  return (
    <BlogContainer>
      <BlogPosts posts={posts} />
    </BlogContainer>
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
export default BlogPage;
