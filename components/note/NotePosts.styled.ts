import styled from "@emotion/styled";

export const Root = styled.div``;

export const Partition = styled.section`
  margin-bottom: 3rem;

  h1 {
    font-weight: bold;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
  }

  ol {
    display: block;
    list-style-type: decimal;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
  }
`;

export const NoteLink = styled.li`
  font-size: 18px;
  padding: 6px 0;

  a {
    display: block;
  }
`;
