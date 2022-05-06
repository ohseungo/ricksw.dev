import { Description, Root, Title } from "./PageTitle.styled";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <Root>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Root>
  );
};

export default PageTitle;
