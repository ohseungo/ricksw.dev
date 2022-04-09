import { Root, PostDate } from "./PostContainer.styled";
import { FrontMatter } from "types/blog";
import { dateToString } from "lib/string-util";
interface ContainerProps {
  frontMatter: FrontMatter;
  children: React.ReactNode;
}

const PostContainer = ({ frontMatter, children }: ContainerProps) => {
  return (
    <Root>
      <h1>{frontMatter.title}</h1>
      <PostDate>{dateToString(frontMatter.date)}</PostDate>
      {children}
    </Root>
  );
};

export default PostContainer;
