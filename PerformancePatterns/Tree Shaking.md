# Tree Shaking

> 사용하지 않는 코드를 제거하여 번들 사이즈를 줄인다

```js
// bad
import arrayUtils from "array-utils";

// good 필요한 것만 가져오기
import { unique, implode, explode } from "array-utils";
```

1. tree-shaking은 최종 자바스크립트 번들에서 실제로 사용되지 않는 코드들을 제거하기 위해 사용된다.

2. webpack 혹은 rollup과 같은 모듈 번들러를 통해 빌드되기 때문에 tree-shaking이 자동으로 적용된다.

3. 모든 애플리케이션에서 트리 쉐이킹 기회를 찾으려면 정적 import문을 찾아야 합니다.

```js
// 모든 utils 함수를 가져온다
// BAD
import * as utils from "../../utils/utils";
```

## Babel이 ES6 모듈을 CommonJS 모듈로 변환시키는 것을 막기

- @babel/preset-env의 기본 동작을 막기

```js
// babel.config.js
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ],
};
```

## CommonJS는 트리쉐이킹이 어렵다.

- CommonJS 모듈에서 트리쉐이킹은 어렵다.
- CommonJS는 동적이다. 최적화 하기 어렵다.

### CommonJS의 require/module.export는 동적이다! -> 변한다.

- 빌드타임에 정적분석 적용을 어렵게 만든다.
  - 동적이기 때문에 어떤 값을 가져와야할지? 런타임에만 알 수 있다.

```js
const utilName = /* 동적인 값 */
const util = require(`./utils/${utilName}`);


function foo() {
  if (/* 동적인 조건 */) {
    module.exports = /* ... */;
  }
}
foo();
```

### ECMAScript는 정적이다!

- 동적 불가능
  - import()는 동적
  - import vs import()를 구분해야한다.

```js
import util from `./utils/${utilName}.js`; // 불가능

import { add } from "./utils/math.js"; // 가능

function foo() {
  export const value = "foo"; // 불가능
}

export const value = "foo"; // 가능
```

### Lodash Issue

lodash는 commonJS로 작성되기 때문에 번들하기 까다롭다.

- ES Module로 작성된 lodash-es를 사용할 수 있다.

```js
// 번들링되지 않는다. 전체 코드를 포함한다
import * as _ from "lodash";
import { cloneDeep } from "lodash";
```

참고

1. https://ui.toast.com/weekly-pick/ko_20180716
2. https://web.dev/reduce-javascript-payloads-with-tree-shaking/
3. https://web.dev/commonjs-larger-bundles/
4. https://yceffort.kr/2021/08/javascript-tree-shaking
5. https://toss.tech/article/commonjs-esm-exports-field
6. https://ykwan0714.github.io/lodash-%ED%81%AC%EA%B8%B0-%EC%A4%84%EC%9D%B4%EA%B8%B0/
