import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { LayoutRoot, Main } from "./Layout.styled";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutRoot>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutRoot>
  );
};

export default Layout;
