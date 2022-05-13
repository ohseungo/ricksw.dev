import { Root } from "./NoteContainer.styled";
import { FrontMatter } from "types/blog";
interface ContainerProps {
  frontMatter: FrontMatter;
  children: React.ReactNode;
}

const NoteContainer = ({ frontMatter, children }: ContainerProps) => {
  return (
    <Root>
      <h1>{frontMatter.title}</h1>
      {children}
    </Root>
  );
};

export default NoteContainer;
