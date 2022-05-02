import { FooterRoot } from "./Footer.styled";

const Footer = () => {
  const thisYear: number = new Date().getFullYear();

  return <FooterRoot>© {thisYear} by RickSW.dev</FooterRoot>;
};

export default Footer;
