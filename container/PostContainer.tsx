import { Root, PostDate, PostHeader } from "./PostContainer.styled";
import { FrontMatter } from "types/blog";
import { dateToString } from "lib/string-util";
interface ContainerProps {
  frontMatter: FrontMatter;
  pageType?: string;
  children: React.ReactNode;
}

const PostContainer = ({ frontMatter, pageType, children }: ContainerProps) => {
  return (
    <Root>
      <PostHeader>
        <h1>{frontMatter.title}</h1>
        {pageType !== "Note" && (
          <PostDate>{dateToString(frontMatter.date)}</PostDate>
        )}
      </PostHeader>
      {children}
    </Root>
  );
};

export default PostContainer;
