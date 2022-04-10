import { Params } from "next/dist/server/router";
import fs from "fs";
import ReactMarkdown from "react-markdown";

import { getBlogPostbySlug } from "lib/matter-util";
import { PostProps } from "types/blog";
import PostContainer from "container/PostContainer";
import CodeBlock from "components/markdown/CodeBlock";
import Blockquote from "components/markdown/Blockquote";

const BlogPost = ({ frontMatter, content }: PostProps) => {
  if (!frontMatter) return false;

  return (
    <PostContainer frontMatter={frontMatter}>
      <ReactMarkdown components={{ code: CodeBlock, blockquote: Blockquote }}>
        {content}
      </ReactMarkdown>
    </PostContainer>
  );
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getBlogPostbySlug(params.slug);
  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts/blog");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
