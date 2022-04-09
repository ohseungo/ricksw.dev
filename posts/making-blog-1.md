---
title: 개인 블로그 제작 기록 - 1. 개요와 초기 세팅
description:
  블로그를 개발하게 된 계기를 간단하게 소개하고, 초기 세팅 방법에 대해서도 설명합니다.
  개발은 Nextjs 로 진행합니다.
date: 2022/04/01
tags:
  - nextjs
  - myproject
---

## 0. 왜 시작하였는가

웹 개발자로 커리어를 결정한 이후 여러번 팀을 결성하여 프로젝트를 진행해보았는데, 여러 이유로 대부분이 중지나 취소되었다. 하지만 이렇게 완성하지 못한 프로젝트를 아예 없었던 일로 할 수는 없었기에 프로젝트들을 진행하며 공부하고 알게 되었던 것들을 개인 notion 에 정리하였다.

이 시기에 tistory, velog 등의 플랫폼에 작성한 포스팅이 아닌 직접 개발한 블로그를 많이 접하게 되었는데, 나도 이런 블로그들을 보면서 나도 직접 개발해봐야겠다는 생각이 들었다.

### 개인 블로그 직접 개발시 장점

- 시작이 간단하면서도 기능을 추가할 수 있는 범위가 넓어 공부하기 용이하다.
- 개인 블로그 자체가 포트폴리오 일부가 될 수 있다.
- Markdown 을 사용하면, 프론트 서버 만으로도 포스팅 구현이 가능하다.

상기한 이런 장점을 생각해보면, 웹 개발자로서 개발을 하지 않을 이유가 들지 않을 정도였다. 따라서 이렇게 시작하였다.

## 1. 프로젝트 목표

내가 이 프로젝트를 하며 최소한으로 얻어갈 것들을 정리했다.

- React, Nextjs 를 더 자세하게 다뤄본다.
- Typescript 를 사용해본다.
- Vercel 을 통해 배포하고, 개인 도메인 설정까지 완료한다.

## 2. 초기 세팅

초기 환경에 세팅할 항목은 다음과 같다.

- Nextjs - static 빌드, SEO 에 용이
-

### 프로젝트 시작하기 ( 보일러플레이트 설치 )

—ts 설정으로 Typescript 기반으로 초기 환경을 세팅한다

```jsx
npx create-next-app@latest blog-name --ts
```

### Import 절대 경로 설정하기

- 자동 생성된 tsconfig.json 내 baseUrl 에 설정한다 ( “baseUrl” : “.” - 가장 상위 폴더 )

```jsx
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Tailwind 설치 및 설정하기

```jsx
npm install -D tailwindcss
npx tailwindcss init
```

- tailwind.config.js

```jsx
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- ./styles/global.css

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Unknown at rule @tailwind 에러 해결 (선택)

<aside>
💡 기본 css 문법에 없어 생기는 경고에 해당하는 에러로 무시해도 무방하다.

</aside>

.vscode/settings.json 생성

```jsx
{
  "css.customData": [".vscode/css_custom_data.json"]
}
```

.vscode/css_custom_data.json 생성

```jsx
{
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind’s `base`, `components`, `utilities`, and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind’s “Functions & Directives” documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives/#tailwind"
        }
      ]
    }
  ]
}
```
