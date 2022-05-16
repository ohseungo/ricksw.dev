---
title: Redux Toolkit 사용방법
description: Redux Toolkit 사용방법
date: 2022/05/16
---

## Redux Toolkit

---

Redux Toolkit (RTK) 는 Redux 를 쉡가 사용하기 위해 공식적으로 제공하는 개발도구이다. 단순한 작업을 위해 필요한 많은 코드량, 복잡도 증가 등을 개선하기 위해 만들어졌고, 현재 기준으로 특별한 경우가 아닌 이상 대부분 원래 Redux 가 아닌 RTK 를 사용하도록 가이드하고 있다.

## Slice

---

```js
const initialState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    input: (state, action) => {
      state.counter = action.payload;
    },
  },
});

export const { increment, decrement, input } = counterSlice.actions;
export default counterSlice.reducer;
```

Slice 는 기존 Redux 의 ㅁction 과 Reducer 함수를 한번에 생성할 수 있는 개념이다.

- state 변경을 immutable 하게 처리를 해주지 않아도 된다. mutable 로 처리해도, RTK 는 내부적으로 immutable 방식으로 변경해준다.
- 생성한 slice 에서 action 을 바로 받을 수 있다.
- 생성한 slice 에서 Reducer 함수를 바로 받을 수 있다.

## Store

---

```js
const store = configureStore({
  reducer: counterReducer,
});

// const store = configureStore({
//   reducer: {
//     a: aReducer,
//     b: bReducer,
//   },
// });
```

Store 은 configureStore 함수를 이용하여 생성한다. 두 개 이상의 reducer 함수를 사용할 경우, 추가적인 함수를 사용할 필요없이 객체를 넘겨주는 것으로 store 을 간단하게 생성할 수 있다.
