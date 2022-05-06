import PageTitle from "components/common/PageTitle";

interface Props {
  children: React.ReactNode;
}
const AboutContainer = ({ children }: Props) => {
  return (
    <>
      <PageTitle title="About" />
      {children}
    </>
  );
};

export default AboutContainer;
