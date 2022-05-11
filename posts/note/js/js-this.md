---
title: 자바 스크립트의 this
description: 자바 스크립트의 this
date: 2022/05/10
---

## this

---

Javascript 에서는 클래스와 인스턴스와 같은 객체 지향에 나오는 개념이 없고, 생성자 함수와 프로토타입이라는 개념으로 유사하게 구현하고 있다.따라서, Javascript 에서의 this 도 c++ 나 Java 의 this 와는 완전히 다른 개념을 가지고 있다. (혼동하면 안된다.)

Javascript 에서는 함수가 호출될 때마다 렉시컬 환경에 대한 정보를 참조하고, 바로 이 this 에 대해서도 참조값이 결정된다. **this 는 함수 호출 방식에 따라 참조하는 값이 달라지며, 이를 this 바인딩이라고도 부른다.**

## 기본 함수 호출

---

```js
var foo = function () {
  console.log(this);
  var bar = function () {
    console.log(this);
  };
  bar(); // log : window
};

foo(); // log : window
```

this 에는 기본적으로 전역객체가 바인딩된다. 브라우저 환경에서는 window, nodejs 에서는 global 이다.
외부 함수, 내부 함수 여부에 상관없이 일반적인 방식으로 함수를 호출했다면 this 에는 전역객체가 바인딩된다.

```js
var foo = function () {
  console.log(this);
};
setTimeout(foo, 1000);
```

콟백 함수의 경우에도 마찬가지다. 호출 시점만 달라질 뿐 일반적인 호출 방식이기 때문에 this 에는 전역객체가 바인딩된다.

## 객체 메소드 호출

---

```js
var obj = {
  name: "foo",
  foo: function () {
    console.log(this);
    console.log(this.name);
  },
};
obj.foo();
//log : {name: 'foo', foo: ƒ}, "foo"
```

함수가 객체의 메소드로서 호출되는 경우, this 는 그 객체를 바인딩한다.

```js
var obj = {
  name: "foo",
  foo: function () {
    console.log(this);
    console.log(this.name);
  },
};
var bar = function (fun) {
  fun();
};
var baz = obj.foo;

bar(obj.foo); //콜백(일반)함수로 실행
//log : window, ""
baz(); //일반 함수로 참조하여 실행
//log : window, ""
```

메소드로서 호출된다는 것이 중요하다. 호출되는 함수가 메소드인 사실은 전혀 상관이 없다.
위와 같이 메소드가 다른 방식으로 실행되는 경우에는 다른 방식으로 바인딩된다는 점에 주의한다.

## 일반 함수 호출 with Strict mode

```js
function foo() {
  "use strict";
  console.log(this);
}

foo(); //log : undefined
window.foo(); // log : window
```

엄격 모드 하에서 일반 함수 호출 시에는 this 에 전역 객체가 바인딩되지 않는다.
엄격 모드가 기본 세팅인 프레임워크를 사용할 때 주의해야한다.

_이는 자바스크립트 내에서 설계상의 실수로, 일반 함수를 호출 시에는 this 바인딩이 되지 않는 것이 원칙적으로 맞는 과정이라고 한다._

## 생성자 함수 호출

---

```js
function Foo(name) {
  this.name = name;
  console.log(this);
}

new Foo("foo"); // log : Foo {name: 'foo'}
Foo("foo"); //log : window
```

new 키워드로 호출된 생성자 함수의 경우에는 새로 생성된 인스턴스다.
생성자 함수가 대문자로 시작하는 것은 어디까지나 약속에 지나지 않는다. 일반 함수로 호출해버리면 마찬가지로 전역객체가 바인딩된다.

## Apply, Call, Bind

---

```js
var foo = function () {
  console.log(this);
};

foo.call("foo"); // log : "foo"
foo.apply("foo"); // log : "foo"
foo.bind("foo")(); // log : "foo"
```

명시적으로 this 를 원하는 객체로 바인딩하는 방법도 있다. Apply, Call, Bind 메소드를 사용하면 원하는 함수의 this 에 원하는 객체를 참조시킬 수 있다.

## 화살표 함수

---

```js
var obj = {
  name: "foo",
  foo: function () {
    console.log(this);
    var bar = () => console.log(this);
    bar(); // log : {name: 'foo', foo: ƒ}
  },
};

obj.foo(); // log : {name: 'foo', foo: ƒ}
```

화살표 함수의 경우 완전히 다르게 작동한다. 호출되는 방식에 따라 결정되는 것이 아니라, 선언되었던 시점의 렉시컬 환경을 참조한다.

위 코드의 경우, bar 는 일반함수로 되었지만 선언되었던 시점의 환경을 참조하여 객체를 this 에 바인딩한다.

이런 방식 때문에 메소드로는 사용을 추천하지 않고, 의미가 없어지는 생성자 함수로는 애초에 생성하지 못하고 오류가 난다. apply, bind, call 도 적용이 되지 않는다.
