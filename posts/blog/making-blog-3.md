---
title: 개인 블로그 제작하기 - (3) 마크다운 포스팅 페이지 만들기
description: react-markdown 을 사용하여 포스팅 페이지를 만들고, react-syntax-highlighter 를 사용하여 포스팅 내 코드 블록을 간편하게 디자인하는 방법에 대해 정리했습니다.
date: 2022/04/16
tags:
  - nextjs
  - myproject
---

저번에는 저장된 마크다운 파일 기반으로 포스팅 리스트과 포스팅 페이지 라우팅을 만드는 기능을 추가했다.

이번 글에서는 마크다운으로 저장된 string 을 해당하는 React 엘리멘트로 변환시켜 HTML 내에서 렌더링될 수 있게 하는 기능에 대해 설명한다.

## react-markdown, react-syntax-highlighter

react-markdown 은 마크다운 파일의 string 을 React 엘리멘트로 변환해주는 핵심 기능을 제공해주는 라이브러리이다.

react-syntax-highlighter 는 필수는 아니지만 작성된 코드 스니펫을 보기 좋은 하이라이트 테마를 적용해주는 라이브러리로, 코드 적을 일이 많은 개발 블로그에서는 사용하면 좋다.

```jsx
npm install react-markdown react-syntax-highlighter
```

## 마크다운 파일을 React 엘리멘트로 변환하기

이전에 작성한 포스팅 페이지에 설치한 react-markdown 을 적용할 것이다.

```jsx
import { Params } from "next/dist/server/router";
import fs from "fs";
import ReactMarkdown from "react-markdown";

import { getBlogPostbySlug } from "lib/matter-util";
import { PostProps } from "types/blog";
import PostContainer from "container/PostContainer";
import CodeBlock from "components/markdown/CodeBlock";

const BlogPost = ({ frontMatter, content }: PostProps) => {
  if (!frontMatter) return false;

  return (
    <PostContainer frontMatter={frontMatter}>
      <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
    </PostContainer>
  );
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getBlogPostbySlug(params.slug);
  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts/blog");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
```

- content 에는 마크다운으로 작성된 string 이 들어온다. 이를 ReactMarkdown 로 감싸면 기본 세팅은 끝이다.
- components props 를 이용하여 content 내에 있는 마크다운 요소들에 대해 개별적인 로직을 추가할 수 있다.
  - ‘#’ 는 원래 <h1/> 으로 매핑되지만 필요에 따라 다른 태그로 매핑할 수도 있다.

## 포스팅 내 코드 블록에 하이라이트 적용하기

```jsx
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeBlock = ({ inline, className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline && match)
    return (
      <SyntaxHighLighter style={vscDarkPlus} language={match[1]} PreTag="div">
        {children}
      </SyntaxHighLighter>
    );
  else return <code className={className}>{children}</code>;
};

export default CodeBlock;
```

- ReactMarkdown Components 에는 기본적으로 직관적인 props 가 전달된다.
  - a 태그라면 href, img 태그라면 src 등
- 그 외에도 전달되는 props 은 아래 공식 링크를 참고하면 된다.
  - [https://github.com/remarkjs/react-markdown#appendix-b-components](https://github.com/remarkjs/react-markdown#appendix-b-components)
- code 태그의 경우 inline 에는 인라인 코드 여부가, className 에는 코드의 언어 정보가 language-js 와 같은 형태로 들어온다.
  - 이를 이용하면 언어에 따라 다른 로직을 따르게 만드는 것도 가능하다.
- 추가로 설치한 react-stnyax-highligher 를 이용하여 코드 불록에 하이라이팅을 해준다.
  테마 정보를 포함한 좀더 자세한 사용 방법은 마찬가지로 공식 github 을 참고하면 된다.
  - [https://github.com/react-syntax-highlighter/react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
