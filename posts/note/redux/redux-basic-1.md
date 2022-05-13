---
title: Redux 기초 구조와 기본 구현 방법
description: Redux 기초 구조와 기본 구현 방법
date: 2022/05/12
---

## Redux

---

Redux 는 현재 가장 많이 사용하고 있는 전역 상태 관리 라이브러리 중 하나이다. React 는 포함한 프레임워크는 물론 순수 Javascript 에서도 사용 가능한 라이브러리이다.
구현 방식이 다양하여 처음 시작하기 어려운 부분이 많다. Redux 를 구현할 수 있는 가장 기본적인 방식을 토대로, 기초 구조에 대해 정리한다.

## Reducer

---

Redux 는 전역 상태 (state) 를 관리하는 라이브러리로, 상태 제어는 Reducer 함수를 통해서만 이루어진다. 전역 상태를 변경하는 방식을 Reducer 함수에서 사전에 정의하고, 이를 통해서만 전역 상태를 변경하게 한다.

```js
const initialState = {
  counter: 0,
};
```

Reducer 함수로 관리할 state 의 초기값을 정의하는 것부터 시작한다. 여기서는 counter 라는 이름의 숫자 변수 하나만 관리한다.

```js
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case INPUT:
      return {
        ...state,
        counter: action.number,
      };
    default:
      return state;
  }
};
```

Reducer 함수는 state, action 두 인수를 전달받아 사용한다.

함수이 호출된 시점의 (현재) 상태가 state 에 들어오고, 위에서 정의한 초기값을 이용한다.

action 은 state 변경 방식을 정의하는 객체이다. action 으로 정의한 변경 방식만 reducer 를 통해 사용할 수 있다. action 은 수행할 작업을 구분하기 위해 필수적인 type 필드와 필요에 따라 다른 필드를 가진다.

state 는 항상 immutable 하게 변경되어야 한다. 변경되는 객체를 새로 카피하여 리턴하는 방식으로 이전 state 는 변경이 없어야 한다.

## Store

---

```js
const store = createStore(counterReducer);
```

상태 관리를 주체하는 store 객체를 만든다.

store 객체는 하나만 사용해야 한다. 만약 관리해야할 상태가 많아져 주제별로 분리해야 할 경우, reducer 함수를 분리하여 생성하고, combineReducer 함수를 이용하여 하나로 통합한 이후에 사용한다.

## Provider

---

```js
const store = configureStore({
  reducer: counterReducer,
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

생성한 store 을 사용하기 위해서는 Provider 객체를 생성해야 한다. Provider 의 하위 자식 컴포넌트 들은 모두 store 에 접근이 가능해지며, 따라서 일반적으로 App 의 부모 컴포넌트로 지정한다.

## useSelector, useDispatch

---

```js
const counter = useSelector((state) => state.counter);
```

```js
const dispatch = useDispatch();
const handleIncrement = () => {
  dispatch({ type: INCREMENT });
};
```

각 컴포넌트에서 state 를 사용하고 변경하는 방법에는 여러가지가 있다.
mapStateToProps, mapDispatchToProps 함수를 이용하는 방법과 useSelector, useDispatch hook 을 사용하는 방법이 있는데, 여기서는 후자에 대해서만 섦명한다. (근본적인 방식에 큰 차이는 없다.)

useSelector 는 state 값을 가져오는데 사용한다. 간단하게 값을 받아올 수도 있고, 함수 형식으로 로직을 추가하여 받아올 수도 있다. 이 hook 은 자동으로 state 를 subscribe 해주기 때문에, 다른 곳에서 state 가 변경이 되더라도 자동으로 re-render 가 이루어진다.

useDispatch 는 dispatch 함수를 받아오는데 사용한다. 이 함수를 통해서만 reducer 함수를 사용할 수 있다. reducer 에서 정의한 action 을 매개변수로 넘겨주어 사용한다.
