import { FooterRoot } from "./Footer.styled";

const Footer = () => {
  const thisYear: number = new Date().getFullYear();

  return <FooterRoot>© {thisYear} Copyright Seungwook Oh</FooterRoot>;
};

export default Footer;
