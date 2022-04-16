import PageTitle from "components/common/PageTitle";
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
  return (
    <Root>
      <PageTitle title="Recent Posts" />
      {posts &&
        posts.sort(sortFunction).map((post, index) => {
          return <BlogPostCard key={index} {...post} />;
        })}
    </Root>
  );
};

export default RecentPosts;
