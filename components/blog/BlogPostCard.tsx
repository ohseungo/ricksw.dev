import Link from "next/link";
import { PostProps } from "types/blog";
import { Root, PostTitle, PostSummary, PostInfo } from "./BlogPostCard.styled";
const BlogPostCard = ({ frontMatter, slug }: PostProps) => {
  return (
    <Root>
      <PostTitle>
        <Link href={`/blog/${slug}`}>
          <a>{frontMatter.title}</a>
        </Link>
      </PostTitle>
      <PostSummary>{frontMatter.description}</PostSummary>
      <PostInfo>
        <dt></dt>
        <dd>{frontMatter.date}</dd>
        <dt></dt>
        <dd className="line_bar">|</dd>
        <dt></dt>
        {frontMatter.tags &&
          frontMatter.tags.map((tag, index) => (
            <dd key={index} className="post_tag">
              {tag}
            </dd>
          ))}
      </PostInfo>
    </Root>
  );
};

export default BlogPostCard;
