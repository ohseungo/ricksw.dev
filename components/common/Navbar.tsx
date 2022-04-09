import navLinks from "constants/navLinks";
import { NavbarRoot } from "./Navbar.styled";
import Link from "next/link";

const Navbar = () => {
  return (
    <NavbarRoot>
      {navLinks.map((nav, index) => (
        <Link href={nav.path} key={index}>
          <a>{nav.name}</a>
        </Link>
      ))}
    </NavbarRoot>
  );
};

export default Navbar;
