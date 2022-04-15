import noteDivisions from "constants/noteDivisions";
import { PostProps, NotePostsProps, NotePostProps } from "types/blog";
import { Root, Partition, NoteLink } from "./NotePosts.styled";

import Link from "next/link";

const NotePosts = ({ posts }: NotePostsProps) => {
  const sortFunction = (a: PostProps, b: PostProps) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  };

  return (
    <Root>
      {noteDivisions.map((division, index) => {
        const filteredPosts = posts?.filter(
          (post) => post.type === division.id
        );

        return (
          <NotePartition
            key={division.id}
            title={division.title}
            posts={filteredPosts}
          />
        );
      })}
    </Root>
  );
};

interface PartitionProps {
  title: string;
  posts?: NotePostProps[];
}
const NotePartition = ({ title, posts }: PartitionProps) => {
  if (posts && posts.length > 0) {
    return (
      <Partition>
        <h1>{title}</h1>
        {posts.map((post, index) => {
          return (
            <NoteLink key={index}>
              <Link href={`./notes/${post.type}/${post.slug}`}>
                <a>
                  <em>{index + 1}</em>
                  {post.frontMatter.title}
                </a>
              </Link>
            </NoteLink>
          );
        })}
      </Partition>
    );
  } else {
    return <></>;
  }
};

export default NotePosts;
