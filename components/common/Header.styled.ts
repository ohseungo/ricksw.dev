import styled from "@emotion/styled";

export const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0 calc((100% - 700px) / 2);

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: solid;
  background-color: #ffffff;

  h1 {
    font-size: 20px;
    cursor: pointer;
  }
`;
