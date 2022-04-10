import fs from "fs";
import matter from "gray-matter";

export const getAllBlogPosts = async () => {
  const files = fs.readdirSync("posts/blog");

  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`posts/blog/${fileName}`, "utf-8");
    const { data: frontMatter, content } = matter(file);

    return {
      frontMatter,
      slug: fileName.replace(/\.md/, ""),
      content,
    };
  });

  return posts;
};

export const getBlogPostbySlug = async (slug: string) => {
  const file = fs.readFileSync(`posts/blog/${slug}.md`, "utf-8");

  const { data: frontMatter, content } = matter(file);

  return { frontMatter, content };
};

export const getAllNotePosts = async () => {
  const files = fs.readdirSync("posts/note");

  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`posts/note/${fileName}`, "utf-8");
    const { data: frontMatter, content } = matter(file);

    return {
      frontMatter,
      slug: fileName.replace(/\.md/, ""),
      content,
    };
  });

  return posts;
};
