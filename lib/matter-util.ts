import fs from "fs";
import matter from "gray-matter";

export const getAllPosts = async () => {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontMatter, content } = matter(file);

    return {
      frontMatter,
      slug: fileName.replace(/\.md/, ""),
      content,
    };
  });

  return posts;
};

export const getPostbySlug = async (slug: string) => {
  const file = fs.readFileSync(`posts/${slug}.md`, "utf-8");

  const { data: frontMatter, content } = matter(file);

  return { frontMatter, content };
};
