import styled from "@emotion/styled";

export const Root = styled.section`
  color: var(--sub-txt-color);
  line-height: 170%;

  h1 {
    line-height: 120%;
    font-size: 2.25rem;
    font-weight: bold;
    margin: 30px 0 12px;
  }
  h2 {
    font-size: 1.75rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }
  h3 {
    font-size: 1.27rem;
    font-weight: bold;
    margin: 20px 0 0;
  }
  h1,
  h2,
  h3 {
    color: var(--main-txt-color);
  }
  p {
    font-size: 1.125rem;
    line-height: 1.625;
    margin: 1.5rem 0;
  }
  ul {
    font-size: 1.125rem;
    padding-left: 40px;
  }
  li {
    display: list-item;
    list-style-type: disc;
  }
  img {
    max-width: 100%;
  }

  pre {
    margin-top: 2em;
    margin-bottom: 3em;
    padding: 0 2em;
  }

  a {
    text-decoration: underline;
  }

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;

export const PostHeader = styled.div`
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

export const PostDate = styled.div`
  font-size: 15px;
  margin-bottom: 24px;
`;
