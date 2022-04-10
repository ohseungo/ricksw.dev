---
title: 테스트 react 2
description: 이건 테스트에요.
date: 2022/04/01
division: react
---

## Typescript 기반으로 Next.js 프로젝트 생성

```jsx
npx create-next-app@latest blog-name --ts
```

## Import 절대 경로 설정하기

- tsconfig.json 내 baseUrl 에 설정한다

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

## Tailwind 초기 세팅

### Install 및 설정파일 생성

```jsx
npm install -D tailwindcss
npx tailwindcss init
```

### tailwind.config.js 설정

```jsx
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- next.js,, typescript 형식에 맞게 세팅한다

### css 에 tailwind 설정 Import

./styles/global.css

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Unknown at rule @tailwind 에러 해결 (선택)

- .vscode/ 폴더 생성

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

## emotion 초기 세팅

```jsx
npm install @emotion/react @emotion/styled
```

- styled-component 를 자주 사용하였으나 SSR 환경인 Next.js 에서는 추가 세팅이 필요
  [https://styled-components.com/docs/advanced#server-side-rendering](https://styled-components.com/docs/advanced#server-side-rendering)
- emotion 은 별도 세팅없이 사용 가능
