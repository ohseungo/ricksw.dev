import { Params } from "next/dist/server/router";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { getPostbySlug } from "lib/matter-util";
import { PostProps } from "types/blog";
import PostContainer from "container/PostContainer";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeBlock = ({ inline, className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline && match)
    return (
      <SyntaxHighLighter style={vscDarkPlus} language={match[1]} PreTag="div">
        {children}
      </SyntaxHighLighter>
    );
  else return <code className={className}>{children}</code>;
};

const BlogPost = ({ frontMatter, content }: PostProps) => {
  if (!frontMatter) return false;

  return (
    <PostContainer frontMatter={frontMatter}>
      <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
    </PostContainer>
  );
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getPostbySlug(params.slug);
  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");

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
