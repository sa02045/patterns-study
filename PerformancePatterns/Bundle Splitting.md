# Bundle splitting

코드를 나누어 초기 로딩 크기를 줄이고 필요한 코드는 지연 로딩한다.

- 사용자가 사용하지 않는 코드들을 여러 작은 번들로 나눈다.
- 자바스크립트 엔진은 실제로 사용하지 않는 코드들도 구문분석하고 컴포알 한다. 이 과정에 드는 비용이 높이 않을 수도 있지만, 큰 번들을 다운로드하는 것은 성능에 문제를 일으킬 수 있다.

## webpack Code Splitting

코드 스플리팅하는 세가지 방식

1. Entry 설정을 사용하여 수동으로 분할
2. Prevent Duplication: 중복 청크를 제거하고 청크를 분할
3. Dynamic Imports: 안리안 함수 호출로 코드를 분할

### Entry

- 가장 쉽고 직관적
- 수동적이다.(로직으로 분할하는 것이 아님)

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## Prevent Duplication

- dependOn 옵션 사용하여 청크간 모듈을 공유

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## Dynamic Imports

1. ECMAScript의 import() 구문 사용하기
2. 웹팩전용 require.ensure 사용하기

```js
function getComponent() {
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```
