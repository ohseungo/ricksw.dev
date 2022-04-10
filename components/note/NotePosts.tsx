import noteDivisions from "constants/noteDivisions";
import { PostProps, PostsProps } from "types/blog";
const NotePosts = ({ posts }: PostsProps) => {
  return (
    <div>
      {noteDivisions.map((division, index) => {
        if (!posts) return false;
        const postDivision = posts.filter(
          (post) => post.frontMatter.division === division.id
        );

        return (
          <article key={division.id}>
            <div>{division.title}</div>
            <div>
              {postDivision.map((post, index) => (
                <div key={index}>{post.frontMatter.title}</div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NotePosts;
