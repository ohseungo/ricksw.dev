import PageTitle from "components/common/PageTitle";
import { Root } from "./HomeContainer.styled";

interface ContainerProps {
  children: React.ReactNode;
}
const HomeContainer = ({ children }: ContainerProps) => {
  return (
    <Root>
      <PageTitle title="Recent Posts" />
      {children}
    </Root>
  );
};

export default HomeContainer;
