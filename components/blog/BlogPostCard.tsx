import Link from "next/link";
import { PostProps } from "types/blog";
import { Root, PostTitle, PostSummary, PostInfo } from "./BlogPostCard.styled";
import { dateToString } from "lib/string-util";

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
        <span>{dateToString(frontMatter.date)}</span>
      </PostInfo>
    </Root>
  );
};

export default BlogPostCard;
