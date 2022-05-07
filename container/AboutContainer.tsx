import PageTitle from "components/common/PageTitle";
import { Root } from "./AboutContainer.styled";

interface Props {
  children: React.ReactNode;
}
const AboutContainer = ({ children }: Props) => {
  return (
    <Root>
      <PageTitle title="About" />
      {children}
    </Root>
  );
};

export default AboutContainer;
