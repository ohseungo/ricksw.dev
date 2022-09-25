---
title: CSR 과 SSR 사이 그 어딘가, Hydration
description: Nextjs 나 Gatsby 를 이용하여 React 애서 서버 사이드 렌더링을 구현하는 방법은 편리합니다. 하지만 Rehydration 를 포함한 렌더링 개념을 재대로 이해하지 않고 있다면 해결이 어려운 문제 상황에 빠지기 쉽습니다. CSR 베이스인 React 에서 SSR 을 구현할 때 놓치기 쉬운 개념인 Hydration 에 대해 알아보겠습니다.
date: 2022/04/17
tags:
  - react
  - nextjs
---

최근 Nextjs 를 이용하여 이것저것 만져보면서 생소한 오류를 만나게 되었는데요.

> Expected server HTML to contain a matching <tag명> in <tag명>

해결법 자체는 스택오버플로우에서 쉽게 찾을 수 있었습니다.

[React 16: Warning: Expected server HTML to contain a matching div in body](https://stackoverflow.com/questions/46443652/react-16-warning-expected-server-html-to-contain-a-matching-div-in-body)

그런데 이 오류는 왜 나오는 걸까요? 제 경우에는 화면 동작에는 아무런 문제가 없었지만 경고가 아니라 확실하게 **오류** 를 띄우고 있었습니다. 위 링크에서는 서버 사이드 렌더링에 대해 설명을 간략히 하면서, DOM 을 구성하는 순서 특성상 useEffect hook 을 써야한다... 이런 식으로 말하고 있습니다.

이 에러는 React 가 서버 사이드 렌더링 과정에서 어떻게 동작하는지 재대로 이해하고 있지 못하면 발생하기 쉽고, 생각보다 심각한 오류가 나올 수 있습니다.

## CSR vs SSR

Nextjs 를 포함한 SSR 기능을 제공하는 프레임워크와 기본 React 가 브라우저에서 각각 어떻게 동작하는지 부터 다시 생각할 필요가 있습니다.

![](/posts/blog/ssr-hydration/no-pre-rendering.png)

일반적인 React 앱의 경우, 모든 화면 렌더링은 브라우저단에서 일어납니다.

따라서 페이지를 요청받은 서버에서 처음으로 전송받는 HTML 은 비어있습니다.

```jsx
<html>
	<head> /.... </head>
	<body>
		<div id= "root"></div>
		<script src = ... ></script>
	</body>
</html>
```

브라우저, 즉 클라이언트 측은 비어 있는 HTML을 전송받은 이후 필요한 JS 파일을 다운 받은 뒤 처음으로 화면을 렌더링하기 시작합니다.

![](/posts/blog/ssr-hydration/pre-rendering.png)

서버 사이드 렌더링은 이러한 렌더링 과정이 서버에서 일어납니다. 서버에서 스크립트를 읽어 전체 HTML을 렌더링한 이후에 전송됩니다. 즉, 서버에 페이지를 요청하면 페이지에 맞는 완전한 HTML 이 전송되는 방식입니다.

하지만 이렇게 전송된 HTML 은 어디까지나 정적인 페이지일 뿐이고, 애니메이션이나 이벤트 등 동적인 기능을 추가하기 위해서는 JS 파일이 필요합니다. 따라서 React 를 통해 생성된 JS 파일을 함께 전송하여 화면에 적용합니다.

이러한 과정을 메마른 HTML 에 "수분을 보충하여" 동적인 화면을 렌더링한다고 하여, 이 작업을 바로 **Hydration** 이라고 부릅니다.

## 서버 측 페이지, 그리고 브라우저 측 페이지

아래 코드는 위에서 소개한 에러가 나오는 코드입니다.

```jsx
export default function Home() {
  const cookies = new Cookies();

  if (cookies.get("test")) {
    return <CookiePage />;
  } else {
    return <DefaultPage />;
  }
}
```

일반적인 React 지식으로는 큰 문제가 없어 보이는 코드입니다.

- 해당 쿠키가 있으면 CookiePage 컴포넌트를 표시한다.
- 없으면 DefaultPage 컴포넌트를 표시한다.

간단한 코드인데 왜 에러가 날까요?

사실 이 에러는 로그인 기능을 추가하였을 때 가장 많이 보게 되는 에러이기도 합니다.

```jsx
export default function Home() {
  const user = getUser(); //로그인 정보를 가져온다
  if (user) {
    return <AuthPage user={user} />;
  }
  return <></>;
}
```

마찬가지로 문제가 없어 보입니다. 그런데 왜?

## Rehydration ≠ Rendering

Rehydration 은 렌더링이 완료된 페이지에 JS 를 적용하는 로직입니다.

**즉, Rehydration 과정에서 화면 변경이 일어나면 안됩니다.**

> React expects that the rendered content is identical between the server and the client. It can patch up differences in text content, but you should treat mismatches as bugs and fix them. In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches.

React 에서도 이를 말하고 있습니다. 서버측과 클라이언트측에서 렌더링된 페이지는 동일해야 합니다.

Rehydration 과정에서 다른 부분을 수정해줄 수는 있다고 하지만, 버그로 규정하고 있고 재대로 수정될 보장도 없기 때문에 코드를 수정해야한다고 명시하고 있습니다.

그래서 위 코드도 에러를 발생시키는 코드가 되는 것입니다. 쿠키와 로그인 정보 모두 클라이언트, 브라우저 단에서 결정이 되는 로직이기 때문에 페이지가 다르게 렌더링될 수 있기 때문이죠.

## 해결방법

SSR 에서 Rehydration 이라는 과정이 존재하는 이상 HTML 을 동일하게 맞춰줘야 하는데,

그러면 처음 이슈와 같이 브라우저단에서 결정이 나는 동적 (Dynamic) 데이터에 대해서는 로직 처리를 어떻게 해줘야 할까요?

컴포넌트가 마운트되어야만 작동을 하는 useEffect hook 을 이용하면 됩니다.

```jsx
export default function Home() {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const user = getUser(); //로그인 정보를 가져온다
  if (user) {
    return <AuthPage user={user} />;
  }
  return <></>;
}
```

이렇게 로직을 바꾸면 서버, 클라이언트(초기 렌더링 기준) 측의 컴포넌트가 모두 null 로 일치하게 되고, 마운트된 이후에 사용자 정보 판단을 하게 되어 rehydration 문제를 해결할 수 있게 된다.

동적인 데이터에 의존적인 컴포넌트인 경우 이런식으로 로직을 세우면 rehydration 에서 나오는 문제 뿐만 아니라 화면이 뜬 이후에 다시 또 화면이 바뀌는 flickering 문제도 해결할 수 있다.

## Reference

[https://nextjs.org/docs/advanced-features/dynamic-import](https://nextjs.org/docs/advanced-features/dynamic-import)

[https://stackoverflow.com/questions/62243026/expected-server-html-to-contain-a-matching-tag-in-tag](https://stackoverflow.com/questions/62243026/expected-server-html-to-contain-a-matching-tag-in-tag)

[https://www.joshwcomeau.com/react/the-perils-of-rehydration/](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
