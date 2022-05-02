import styled from "@emotion/styled";

export const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  padding: 0 calc((100% - var(--page-max-width)) / 2);

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: solid var(--sub-border-color);
  background-color: var(--main-bg-color);

  h1 {
    font-size: 20px;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;

export const SubRoot = styled.div`
  display: flex;

  align-items: center;
`;
