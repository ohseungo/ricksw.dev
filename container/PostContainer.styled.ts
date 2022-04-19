import styled from "@emotion/styled";

export const Root = styled.section`
  color: var(--sub-txt-color);
  line-height: 150%;
  h1 {
    line-height: 120%;
    font-size: 30px;
    font-weight: 800;
    margin: 30px 0 12px;
  }
  h2 {
    margin: 28px 0 0;
  }
  h3 {
    margin: 20px 0 0;
  }
  h1,
  h2,
  h3 {
    color: var(--main-txt-color);
  }
  p {
    margin: 1em 0;
  }

  img {
    max-width: 100%;
  }

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;

export const PostDate = styled.div`
  font-size: 15px;
  margin-bottom: 24px;
`;
