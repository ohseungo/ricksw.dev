export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
}
export interface PostProps {
  frontMatter: FrontMatter;
  slug: string;
  content: any;
}

export interface BlogPostsProps {
  posts?: PostProps[];
}

export interface NotePostsProps {
  posts?: NotePostProps[];
}
export interface NotePostProps {
  frontMatter: FrontMatter;
  type: string;
  slug: string;
  content: any;
}
