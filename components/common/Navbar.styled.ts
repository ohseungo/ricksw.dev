import styled from "@emotion/styled";

export const NavbarRoot = styled.nav`
  a {
    font-size: 18px;
    padding-right: 20px;
  }

  svg {
    fill: var(--main-txt-color);

    @media (min-width: 0px) {
      display: none;
    }
  }
`;
