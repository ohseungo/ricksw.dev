import { Params } from "next/dist/server/router";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { NextSeo } from "next-seo";

import { getNotePostbyTypeAndSlug } from "lib/matter-util";
import { PostProps } from "types/blog";
import CodeBlock from "components/markdown/CodeBlock";
import Blockquote from "components/markdown/Blockquote";
import NoteContainer from "container/NoteContainer";

const BlogPost = ({ frontMatter, content }: PostProps) => {
  if (!frontMatter) return false;

  return (
    <NoteContainer frontMatter={frontMatter}>
      <NextSeo title={frontMatter.title} />
      <ReactMarkdown components={{ code: CodeBlock, blockquote: Blockquote }}>
        {content}
      </ReactMarkdown>
    </NoteContainer>
  );
};

export const getStaticProps = async ({ params }: Params) => {
  const [type, slug] = params.slug;
  const post = await getNotePostbyTypeAndSlug(type, slug);
  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const folders = fs.readdirSync("posts/note");
  let paths: any[] = [];
  folders.map((folderName) => {
    const files = fs.readdirSync(`posts/note/${folderName}`);
    const pathsByFolder = files.map((fileName) => ({
      params: {
        slug: [folderName, fileName.replace(/\.md/, "")],
      },
    }));
    paths = paths.concat(pathsByFolder);
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
