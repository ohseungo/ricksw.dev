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

export interface PostsProps {
  posts?: PostProps[];
}
