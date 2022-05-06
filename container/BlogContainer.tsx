import PageTitle from "components/common/PageTitle";
import { Root } from "./BlogContainer.styled";

interface ContainerProps {
  children: React.ReactNode;
}
const BlogContainer = ({ children }: ContainerProps) => {
  return (
    <Root>
      <PageTitle title="Blog" description="개발 경험을 기록하고 공유합니다." />
      {children}
    </Root>
  );
};

export default BlogContainer;
