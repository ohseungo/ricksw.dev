import { FooterRoot } from "./Footer.styled";

const Footer = () => {
  const thisYear: number = new Date().getFullYear();

  return <FooterRoot>© {thisYear} Copyright SeungWookOh</FooterRoot>;
};

export default Footer;
