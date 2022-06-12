---
title: Client Side Routing 과 CRA HistoryFallback 설정
description: React router 에서 BrowserRouter 를 통한 라우팅 처리는 클라이언트 사이드 라우팅 특성상 URL 직접입력과 새로고침을 처리하지 못합니다. 하지만 create-react-app 에서는 문제가 없는 것 처럼 보입니다. 이 혼란스러운 현상의 이유에 대해 정리하였습니다.
date: 2022/05/22
tags:
  - react
---

React 를 통한 웹 개발은 SPA 적인 이유로 인해 "사이트" 라는 표현보다는 "애플리케이션" 이라는 표현을 좀 더 자주 쓸 정도로 프로젝트 구조가 이질적입니다.

SPA 에서 기존의 라우팅 구조를 사용하기 위한, 브라우저에서 라우팅을 처리한다는 Client Side Routing 개념이 대표적입니다.

## Client Side Routing 의 문제점

---

[Stack Overflow : React-router URLs don't work when refreshing or writing manually](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually)

React 로 개발한 SPA 는 싱글 페이지라는 특성에도 불구하고 라우팅 주소를 처리해야하는 상황이 자주 있습니다. 브라우저 라우터를 통한 Client Side Routing 은 이것을 도와주는데, 안타깝게도 서버에서 추가로 설정을 해주지 않으면 새로고침이나 주소 입력에 404를 띄우는 문제가 있습니다.
(자세한 이유와 관련 개념은 링크 참고)

하지만 create-react-app 으로 제작한 프로젝트에서 이 라우팅이 문제없이 돌아가는 현상을 볼 수 있었습니다. 정확히는

- development
- Vercel 를 통한 배포

에서는 새로고침과 주소 입력에도 라우팅이 정상적으로 처리되었고,

- netlify 를 통한 배포

에서는 404 에러가 발생하였습니다.

결론부터 쓰자면 이 현상은 CRA 에서 사전에 설정된 Webpack 설정 때문이었습니다.

## HistoryFallback

create-react-app 에는 react 를 쉽게 구현하기 위한 라이브러리 들이 이미 세팅이 되어있습니다. 그 중 대표적인 것이 번들링을 도와주는 webpack 입니다.

이러한 라이브러리들의 설정은 원래는 감춰져있는 상태지만

```js
npm run eject
```

라는 설정을 전부 추출해주는 역할을 한다.

이를 수행하면 추출되는 webpack 에 관한 설정 중 개발 서버 구동을 위한 설정인 webpackDevServer.config.js 에서 다음과 같은 설정을 찾을 수 있다.

```js
historyApiFallback: {
  // Paths with dots should still use the history fallback.
  // See https://github.com/facebook/create-react-app/issues/387.
  disableDotRule: true,
  index: paths.publicUrlOrPath,
},
```

[github : history api fallback ](https://github.com/bripkens/connect-history-api-fallback)

이 설정은 404 에러가 일어났을때 브라우저 내의 historyAPI 를 이용하여 사전에 설정된 index 파일 등을 대신 보여주는 설정이다.

이 설정으로 개발 서버 환경에서는 라우팅이 정상적으로 수행되는 것이다.
또한 배포 서버의 경우 CRA 를 지원하는 배포 사이트 중 Vercel 과 같은 사이트는 이런 설정을 해주지만, netlify 와 같은 사이트의 경우 build 시 추가 설정을 해주지 않으면 이런 fallback 설정이 되지 않아서 일어난 현상이었다.
