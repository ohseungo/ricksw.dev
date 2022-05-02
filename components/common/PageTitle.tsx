import { Root, Title } from "./PageTitle.styled";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <Root>
      <Title>{title}</Title>
    </Root>
  );
};

export default PageTitle;
