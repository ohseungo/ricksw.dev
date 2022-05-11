import styled from "@emotion/styled";

export const LayoutRoot = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: 100%;
  align-items: center;
`;

export const Main = styled.div`
  width: 100%;
  max-width: var(--page-max-width);
  padding-bottom: 160px;

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;
