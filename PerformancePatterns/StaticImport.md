# Static Import

- webpack, rollup과 같은 툴을 사용하여 여러 파일을 하나로 병합한 `번들파일`을 만든다
- 어떤 컴포넌트가 정적 Import인 경우 webpack은 컴포넌트를 초기 번들에 포함시킨다

```js
// app.js
import { add } from "./math.js";
console.log(add(16, 26)); // 42

// math.js
export function add(a, b) {
  return a + b;
}

// bundle
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

# 정적 번들크기 분석하기

## webpack bundle analyzer 라이브러리

https://github.com/webpack-contrib/webpack-bundle-analyzer

# 정적 import 문

- 가져오는 모듈은 무조건 `엄격 모드`이다.
- 정적 코드분석도구, 트리쉐이킹에 적용하기 쉽다

# ESM이 등장하기 전

- 브라우저에서 ESM(ES Modules)을 지원하기 전까지는, JavaScript 모듈화를 언어 레벨에서 진행할 수 없었다.
- 따라서 개발자들은 모듈 대신 번들링이라는 방법을 사용할 수 밖에 없었다
- 웹팩, 롤업같은 도구들이 번들링 작업을 한다.

# namespace pattern

| 전역을 피하자

- 객체안에 넣어서 전역충돌을 피하자

```js
var FooCompany = {};
FooCompany.common = {};
FooCompany.Service = {};
FooCompany.Service.sideMenu = {};
```

# module pattern

- 또 다른 방법, 즉시실행함수로 `함수 스코프`를 활용한다.

```js
const module = (function () {
  var message = "안녕하세요";
  function foo() {}
  function bar() {}

  //   밖에서도 쓰고싶은 값은 return
  return {
    foo: foo,
  };
})();
```

# ECMAScript Modules ESM

- export, import 구문
- `언어 표준`
- 쉬운 정적분석

```js
// 틀린코드
import(SOME_CONDITION){
    import React from 'react'
}
```

- Top-level await 기능 제공 (쉬운 비동기 모듈)

# CommonJS

- require(): 함수이다

- 정적분석이 어려
- 기본적으로 동기적인 동작, 비동기 모듈 정의가 불가능함
- require 함수는 재정의 가능 (문법이 아닌 함수!)

# Node.js 12버전부터 ESM을 지원한다

- 타입스크립트 연동도 복잡, 어렵다...

## Node.js에서의 ESM 규칙

# Webpack

- 문법은 ESM을 지원한다.(가짜 ESM)
- babel, typescript가 ESM 문법(import)를 CommonJS로 변환해준다. (Native ESM이 아님)

# Native ESM

- 아직까지는 어려움...
- 지나친 round trip(클라이언트에서 서버로 왔다갔다 하는 시간)
- 성능 비효율
- 모듈지원문제

그래서 현실은 번들(하나의파일)로 만들고 번들러가 지원하는 트리쉐이킹, lazy-loading 기술을 사용하는것이 최선
