---
title: 실행 컨텍스트와 렉시컬 환경
description: 실행 컨텍스트와 렉시컬 환경
date: 2022/04/12
---

## 실행 컨텍스트 (Execution context)

---

> **Execution context**
>  is the abstract concept used by ECMA-262 specification for typification and differentiation of an executable code.

ECMAScript 에서는 실행 컨텍스트를 실행 가능한 코드를 유형화하고 구별하기 위한 추상적인 개념이라고 정의하고 있다.

쉽게 설명하자면 실행 코드의 런타임 환경을 알기 위한 추상적인 개념으로 보면 된다.

실행 컨텍스트는 코드가 처음 실행될 때와 함수가 호출될 때마다 각각 생성되며 이를 각각 전역 컨텍스트 ( Global EC ) 와 함수 컨텍스트 ( Function EC ) 라 한다. 이 컨텍스트들은 스택에서 관리되며 이를 실행 컨텍스트 스택 ( EC Stack ) 혹은 콜 스택 ( Call Stack ) 이라 한다.

### 실행 컨텍스트의 구성 변경 (ES5)

ES3 의 실행 컨텍스트는 실행 환경을 관리하기 위해 변수 객체(Variable Object), 스코프 체인 ( Scope Chain) 과 같은 개념을 사용했었다. 하지만 ES5로 넘어오며 렉시컬 환경( **Lexcial Environment** ) 기반으로 변경되었다.

ES5 에서 변경된 실행 컨텍스트의 구성 요소를 알기 전에, 먼저 렉시컬 환경에 대해 알아야 할 필요가 있다.

## 렉시컬 환경 (Lexical environment)

---

> **Lexical Environment**
>  is a specification type used to define the association of *Identifiers* to specific variables and functions based upon the lexical nesting structure of ECMAScript code.

렉시컬 환경은 코드를 실행하기 위한 필요한 식별자를 찾기 위해서 사용하는 것으로, 스코프 안에서 정의된 변수, 함수의 정보가 담겨져 있다.

렉시컬이라는 표현은 자바스크립트의 스코프 타입과 관련이 있는데, 자바스크립트는 렉시컬 ( 또는 정적 ) 스코프 ( Lexical Scope, Static Scope ) 를 따른다. 이는 식별자가 유효한 상위 스코프를 함수가 어디에 선언되었는지에 따른다는 의미이다.

자바스크립트의 렉시컬 환경은 두 요소로 구성된다

- 환경 레코드 ( Environment Record )
- 외부 환경 참조 ( Refrence to the outer environment )

### 환경 레코드 ( Environment Record )

해당 실행 컨텍스트의 렉시컬 스코프 내에서 생성된 변수, 함수의 식별자 정보를 저장한다. .

컨텍스트가 생성될 때 식별자 정보를 수집하기 때문에 코드가 실행되기 전에도 식별자에 접근이 가능한데, 이것이 호이스팅 ( Hoisiting ) 개념 이다.

렉시컬 스코프는 함수 선언, catch 구문, with 구문 에 따라 새로 생성된다. ES6 이후에는 let, const 의 블록 스코프 개념이 추가되며 블록 구문도 해당 경우에 추가되었다.

### 외부 환경 참조 ( Reference to outer environment )

렉시컬 스코프 기준으로 상위 렉시컬 환경을 레퍼런스한다. 여기서 상위 환경은 렉시컬 스코프를 따르므로 해당 실행 컨텍스트에 해당하는 함수가 선언될 당시의 렉시컬 환경을 말한다.

```jsx
var x = 10;
function foo() {
  var y = 20;

  function bar() {
    var z = 30;
  }

  function baz() {
    var w = 40;
  }
}
```

```jsx
//전역 컨텍스트
globalEnvironment = {
	environmentRecord : {
		//빌트인 변수, 함수
		Object : function,
		Array : function,
		....

		x : 10,
	},
	outer : null
}
// foo 함수 컨텍스트
fooEnvironment = {
	environmentRecord : {
		y : 20
	},
	outer : globalEnvironment
}
// bar 함수 컨텍스트
barEnvironment = {
	environmentRecord : {
		z : 30
	},
	outer : fooEnvironment
}
// baz 함수 컨텍스트
bazEnvironment = {
	environmentRecord : {
		w : 40
	},
	outer : fooEnvironment
}
```

## 실행 컨텍스트의 렉시컬 환경

---

ES5 이후 현재 실행 컨텍스트는 두가지 렉시컬 환경으로 구성된다.

- VariableEnvironment
- LexicalEnvironment

![](/posts/notes/js/execution-context.png)

### LexicalEnvironment

직역 : 실행 컨텍스트 내부에 있는 코드에 의해 만들어진 식별자를 탐색하는데 쓰이는 렉시컬 환경

렉시컬 환경은 기본적으로 해당 실행 컨텍스트에 따르지만, catch 구문, block 구문 등에 따라서도 새로운 환경이 나오게 된다. LexicalEnvironment 는 바로 이 환경을 지칭하며, 보통 렉시컬 환경이라고 하면 이쪽을 말한다.

### VariableEnvironment

직역 : 실행 컨텍스트 내의 변수선언에 의해 생성된 환경 레코드를 지니고 있다.

실행 컨텍스트가 생성될 당시 변수 정보를 지닌 환경으로, 이전 구성요소인 변수 객체 (Variable Object) 과 유사한 개념이다. LexicalEnvironment 의 하위 요소와도 같은 개념인데, 이는 위에서 렉시컬 환경을 변경하는 catch 나 block 구문이 끝났을 때 이전 정보를 기억할 필요가 있기 때문이다.

아래와 같은 케이스를 참고하자.

```jsx
function foo() {
  var a = 0;
  let b = 1;
  {
    var c = 2;
    let d = 3;
    console.log(c); //2
    console.log(d); //3
  }
  console.log(a); //0
  console.log(b); //1
  console.log(c); //2
  console.log(d); //d is not defined
}
```

## 클로저 ( Closure )

---

클로저는 렉시컬 환경과 일급 함수의 특징으로 나오는 개념이다. 따라서 자바스크립트만의 개념이 아닌 이러한 특징을 가진 언어라면 공통적으로 존재하는 개념이다.

클로저를 MDN 에서는 아래와 같이 정의하고 있다.

> A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**).

직역하면 “클로저는 렉시컬 환경 참조와 묶여진 함수의 조합이다.” 인데, 무슨 말인지 알기 어렵다. 위의 내용을 이해한 뒤에 예시부터 보면 이해가 빨라진다.

```jsx
function foo() {
  var x = 10;
  function bar() {
    console.log(x);
  }
  return bar;
}

var baz = foo();
baz(); //10
```

위와 같은 케이스에서 foo 함수는 내부함수인 bar 를 반환한 뒤 실행이 끝났다. 즉, foo 함수 실행 컨텍스트가 제거되었다. bar 를 반환받은 함수를 호출하자 foo 내부의 변수에 접근이 가능하다는 것을 확인할 수가 있다.

이는 내부함수 bar 가 선언 당시의 렉시컬 환경을 기억하고 있기 때문이다. 여기서 x, 즉 함수 내부 변수나 인수도 아닌 변수를 자유 변수 ( Free variable ) 이라 하는데, 렉시컬 환경을 기억하여 이 자유 변수에 대한 접근이 가능하다.

클로저 개념은 전역 변수의 사용을 줄이거나 private 과 같은 효과를 내는데 사용이 가능하다.

## This

---

자바스크립트의 this 에는 함수가 호출될 때, **호출되는 방식**에 따라 동적이고 ( dynamically ) 암묵적으로 ( implicitly ) 바인딩할 객체가 결정된다. 여기서 동적이라는 말은 정적 (렉시컬) 방식의 반대로 함수의 선언 방식이 아닌 호출 방식에 따른다는 말이다.

this 에 바인딩되는 객체를 결정하는 호출 방식들은 다음과 같다.

1. 일반 함수 호출
2. 객체 내 메소드 호출
3. 생성자 함수 호출
4. apply, call, bind 호출

### 일반 함수 호출

전역, 함수, 내부 함수 호출의 경우 this 는 전역 객체에 바인딩 된다.

```jsx
console.log(this); // window
function foo() {
  console.log(this); // window
  function bar() {
    console.log(this); // window
  }
  bar();
}
foo();
```

### 객체 내 메소드 호출

객체 내 메소드 호출의 경우 this 는 해당 객체에 바인딩된다. 다만 메소드의 경우에도 일반 함수 방식으로 호출된다면 this 는 호출 방식에 따라 전역 객체에 바인딩되는 점에 주의한다.

```jsx
var foo = {
  bar: function () {
    console.log(this);
  },
};
foo.bar(); // { bar : function }
var baz = foo.bar;
baz(); // window
```

### 생성자 함수 호출

new 를 붙어 호출하는 생성자 함수의 경우 this 에는 새롭게 생성된 객체가 바인딩한다. 다만 자바스크립트에서 생성자 함수는 따로 없고 new 에 의해 결정된다. 따라서 new 를 붙이지 않는다면 일반함수 방식으로 호출되는 점에 주의한다.

```jsx
function Foo() {
  console.log(this);
}
new Foo(); // Foo{}
Foo(); // window
```

### apply, call, bind 호출

apply, call, bind 는 Function 의 메소드이며 this 를 명시적으로 바인딩할 수 있는 방법이다. 각각 인자로 전달되는 객체를 this 에 명시적으로 바인딩한다.

apply, call 의 경우 새로운 함수가 바로 호출되며, bind 의 경우 새로운 함수를 리턴한다.

```jsx
function foo() {
  console.log(this);
}
var bar = { x: 1 };
foo.apply(bar); // { x : 1 }
foo.call(bar); // { x : 1 }
foo.bind(bar)(); // { x : 1 }
```

apply, call 의 차이점은 두번째 이후의 인자를 해당 함수의 매개변수에 전달하는 방식에 차이점이 있다.

```jsx
function foo(word1, word2) {
  //...
}
foo.apply(bar, [1, 2]);
foo.call(bar, 1, 2);
```

### 주의사항 : 화살표 함수 ( Arrow Function )

ES6 에서 추가된 화살표 함수의 경우 this 는 특별한 케이스를 따르는데, 기존의 동적 방식이 아닌 정적 ( 렉시컬 ) 방식을 따른다.

즉, 기존 this 방식이 아닌 외부 렉시컬 환경을 바인딩 하는 방식을 따르게 된다.

```jsx
var foo = {
  bar: () => this,
  baz: function () {
    var arrow = () => this;
    return arrow();
  },
};
foo.bar(); // window
foo.baz(); // { bar : f, baz : f }
```

## Reference

[https://262.ecma-international.org/6.0/#sec-lexical-environments](https://262.ecma-international.org/6.0/#sec-lexical-environments)

[http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/](http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/)
