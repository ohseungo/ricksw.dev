// import { Params } from "next/dist/server/router";
import { NextSeo } from "next-seo";
import fs from "fs";
import matter from "gray-matter";

import AboutContainer from "container/AboutContainer";
import { PostProps } from "types/blog";

const AboutPage = ({ frontMatter, content }: PostProps) => {
  return (
    <AboutContainer>
      <NextSeo title="About" />
      {content}
    </AboutContainer>
  );
};

export const getStaticProps = async () => {
  const file = fs.readFileSync(`posts/about.md`, "utf-8");

  const { data: frontMatter, content } = matter(file);
  return {
    props: { frontMatter, content },
  };
};

export default AboutPage;
