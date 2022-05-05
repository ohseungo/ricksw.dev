import Navbar from "./Navbar";
import { HeaderRoot, SubRoot } from "./Header.styled";

import Link from "next/link";
import DarkModeSlider from "./DarkModeSlider";

const Header = () => {
  return (
    <HeaderRoot>
      <Link href="/">
        <h1>RickSW.dev</h1>
      </Link>
      <SubRoot>
        <Navbar />
        <DarkModeSlider />
      </SubRoot>
    </HeaderRoot>
  );
};

export default Header;
