import Navbar from "./Navbar";
import { HeaderRoot } from "./Header.styled";

import Link from "next/link";

const Header = () => {
  return (
    <HeaderRoot>
      <Link href="/" passHref>
        <h1>RickSW.dev</h1>
      </Link>
      <Navbar />
    </HeaderRoot>
  );
};

export default Header;
