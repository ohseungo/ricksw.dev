---
title: 개인 블로그 제작 기록 - 2. gray-matter 로 마크다운 기반 틀 세팅하기
description: 마크다운 기반 블로그를 위한 라이브러리인 gray-matter 사용법에 대해 알아본다.
date: 2022/04/03
tags:
  - nextjs
  - myproject
---

이번 포스팅에서는 gray-matter 라는 라이브러리를 이용하여 마크다운 기반 블로그의 틀을 세우는 작업에 대해 다룬다.

## gray-matter

[gray-matter](https://www.npmjs.com/package/gray-matter) 은 [front-matter](https://hexo.io/ko/docs/front-matter.html) 가 명시된 텍스트 파일을 오브젝트로 변환시켜주는 라이브러리다.
이를 이용하면 마크다운으로 작성한 파일을 프론트엔드 안에서도 간편하게 관리할 수 있다.

## 마크다운 파일에 frontmatter 작성

우선 마크다운으로 작성할 포스팅 파일을 보관할 폴더를 생성한다. 이 블로그의 경우 posts 폴더를 생성하여 아래에 파일을 보관하였다. 따라서 주소는 posts/file-name.md 와 같은 형태.

각 마크다운 파일은 앞부분에 frontmatter 가 명시되어야

한다. 템플릿은 아래와 같은 형태로 자세한건 위 링크를 참고하면 된다.

```jsx
---
title: 테스트
description: 이건 테스트에요.
date: 2022/04/01
tags:
  - nextjs
  - study
---
```

## grey-matter 기반 function 작성

이제 posts 폴더 아래에 있는 포스트 파일들을 object 형태로 가져오는 function 을 구현한다.

우선 핵심이 될 라이브러리인 gray-matter 를 설치한다.

```jsx
npm install gray-matter
```

재사용성을 위해 lib 폴더 아래에 matter-util.ts 라는 파일을 생성한 뒤 그 아래와 같은 코드를 작성한다.

```jsx
import fs from "fs";
import matter from "gray-matter";

export const getAllPosts = async () => {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontMatter, content } = matter(file);

    return {
      frontMatter,
      slug: fileName.replace(/\.md/, ""),
      content,
    };
  });

  return posts;
};

export const getPostbySlug = async (slug: string) => {
  const file = fs.readFileSync(`posts/${slug}.md`, "utf-8");

  const { data: frontMatter, content } = matter(file);

  return { frontMatter, content };
};
```

- gray-matter 는 fs.readFileSync 로 가져온 string 을 object 형태로 편리하게 만들어준다.
- 위에서 정의한 frontmatter 부분이 object 형태로 data 에 담기고, 본문 마크다운 부분은 content 부분에 담겨 return 된다.

## 포스팅 목록 만들기

앞에서 만든 getAllPosts 를 이용하여 포스팅 목록 컴포넌트를 만들고, 이를 띄워줄 home 화면을 만든다.

```jsx
import { PostsProps } from "types/blog";
import BlogPostCard from "./BlogPostCard";
import { BlogPostsRoot } from "./BlogPosts.styled";

const BlogPosts = ({ posts }: PostsProps) => {
  return (
    <BlogPostsRoot>
      {posts &&
        posts.map((post, index) => {
          return <BlogPostCard key={index} {...post} />;
        })}
    </BlogPostsRoot>
  );
};

export default BlogPosts;
```

```jsx
import { PostsProps } from "types/blog";
import BlogPosts from "components/blog/BlogPosts";
import { getAllPosts } from "lib/matter-util";

const Home = ({ posts }: PostsProps) => {
  return (
    <>
      <BlogPosts posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
export default Home;
```

- getStaticProps 은 해당 페이지를 서버에서 사전 렌더링할때 사용한다. 자세한 내용은 [공식 가이드](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) 를 참고하자.
- props 타입의 경우에도 재사용성을 위해 모듈을 따로 만들었다. 기존 스크립트를 통한 개발에서는 문제가 되지 않은 부분이었으나 타입스크립트에서는 타입 명시가 필요하다. 불편해 보이지만 놓칠 수 있는 에러를 잡아주는 경우가 많아 얻는 것이 더 많다고 생각한다.

## 각 포스팅의 라우팅 주소 설정하기

포스팅 하나하나에 대한 라우팅 주소 설정이 필요하다.

이는 nextjs 의 [Dynamic Route](https://nextjs.org/docs/routing/dynamic-routes) 와 [getStaticPath](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) 기능을 사용하면 된다. 자세한 내용은 역시 해당 가이드를 참고하자.

```jsx
import { Params } from "next/dist/server/router";
import fs from "fs";

import { getPostbySlug } from "lib/matter-util";
import { PostProps } from "types/blog";
import PostContainer from "container/PostContainer";

const BlogPost = ({ frontMatter, content }: PostProps) => {
  if (!frontMatter) return false;

  return <PostContainer frontMatter={frontMatter}>{content}</PostContainer>;
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getPostbySlug(params.slug);
  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");

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

- getStaticPaths 에서 posts 아래에 있는 파일들의 이름을 기반으로 라우팅을 위한 slug url 들을 설정한다.
- getStaticProps 에서 사전 정의된 params 패러미터를 가져올 때 타입 import 가 필요하다. ( import { Params } from "next/dist/server/router" )
- slug 네이밍을 기반으로 해당하는 포스팅 정보를 가져온다
