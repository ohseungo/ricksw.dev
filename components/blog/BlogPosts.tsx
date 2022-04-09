import { PostProps, PostsProps } from "types/blog";
import BlogPostCard from "./BlogPostCard";
import { BlogPostsRoot } from "./BlogPosts.styled";

const BlogPosts = ({ posts }: PostsProps) => {
  const sortFunction = (a: PostProps, b: PostProps) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  };
  return (
    <BlogPostsRoot>
      {posts &&
        posts.sort(sortFunction).map((post, index) => {
          return <BlogPostCard key={index} {...post} />;
        })}
    </BlogPostsRoot>
  );
};

export default BlogPosts;
