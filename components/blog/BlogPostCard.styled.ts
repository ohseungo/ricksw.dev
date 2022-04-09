import styled from "@emotion/styled";

export const Root = styled.div`
  max-width: 600px;
  border-bottom: 1px solid #ededed;
  margin: 0 auto 34px;
  clear: both;
`;

export const PostTitle = styled.h2`
  font-size: 24px;
  padding-bottom: 10px;
  margin: 0;
`;

export const PostSummary = styled.div`
  color: #666;
  padding-bottom: 20px;
`;

export const PostInfo = styled.dl`
  display: flex;
  align-items: center;

  overflow: hidden;
  margin: 0;
  padding-left: 4px;
  padding-bottom: 24px;

  font-size: 14px;

  dt {
    margin: 0;
    padding: 0;

    float: left;
    margin-right: 4px;
  }
  dd {
    margin: 0;
    padding: 0;

    float: left;
  }

  .line_bar {
    margin: 0 12px;
  }

  .post_tag {
    margin: 0 2px;
    padding: 4px 8px;
    background-color: #eaeaea;
    border-radius: 10px;
  }
`;
