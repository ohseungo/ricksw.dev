import styled from "@emotion/styled";

export const Root = styled.section`
  color: var(--sub-txt-color);
  line-height: 170%;
  h1 {
    line-height: 120%;
    font-size: 2.25rem;
    font-weight: 800;
    margin: 30px 0 12px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 3.6rem 0 0;
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
    font-size: 1.125rem;
  }
  ul {
    font-size: 1.125rem;
  }
  img {
    max-width: 100%;
  }

  pre {
    margin-top: 2em;
    margin-bottom: 3em;
  }

  a {
    text-decoration: underline;
  }

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;

export const PostDate = styled.div`
  font-size: 15px;
  margin-bottom: 24px;
`;
