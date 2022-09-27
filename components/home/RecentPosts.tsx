import { PostProps, BlogPostsProps } from "types/blog";
import BlogPostCard from "../blog/BlogPostCard";
import { Root } from "./RecentPosts.styled";

const RecentPosts = ({ posts }: BlogPostsProps) => {
  const sortFunction = (a: PostProps, b: PostProps) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  };

  posts = posts?.sort(sortFunction);
  const recentPosts = posts && posts.length > 5 ? posts?.slice(0, 5) : posts;
  return (
    <Root>
      {posts &&
        recentPosts?.map((post, index) => {
          return <BlogPostCard key={index} {...post} />;
        })}
    </Root>
  );
};

export default RecentPosts;
