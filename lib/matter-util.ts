import fs from "fs";
import matter from "gray-matter";
import { FrontMatter, NotePostProps } from "types/blog";
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
  const folders = fs.readdirSync("posts/note");
  let posts: NotePostProps[] = [];
  folders.map((folderName) => {
    const files = fs.readdirSync(`posts/note/${folderName}`);
    const postsByFolder = files.map((fileName) => {
      const file = fs.readFileSync(
        `posts/note/${folderName}/${fileName}`,
        "utf-8"
      );

      const { data, content } = matter(file);
      const frontMatter = data as FrontMatter;
      return {
        frontMatter,
        type: folderName,
        slug: fileName.replace(/\.md/, ""),
        content,
      };
    });
    posts = posts.concat(postsByFolder);
  });

  return posts;
};
