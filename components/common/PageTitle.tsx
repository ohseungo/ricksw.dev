import { Root, Title } from "./PageTitle.styled";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <Root>
      <Title>
        {title}
        {description && (
          <>
            <span className="bar">|</span>
            <span className="title_des">{description}</span>
          </>
        )}
      </Title>
    </Root>
  );
};

export default PageTitle;
