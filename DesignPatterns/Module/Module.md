# 모듈 패턴


## 모듈 라이브러리

- 원래 자바스크립트에는 모듈 문법이 존재하지 않았다.
- 그러나 점차 어플리케이션의 규모가 커지게 되자 모듈의 필요성을 느끼게 되었다. 그래서 모듈 라이브러리가 탄생하게 되었다.
- ES2015에 되어서야 자바스크립트의 표준 모듈시스템(ESM)이 등장했다. `<script type="module">`
- 
### 모듈 특징
- 항상 strict mode로 동작한다
- 모듈 스코프를 가진다 (자신만의 스코프)
- 동일한 모듈을 여러 곳에서 import해서 사용하더라도 단 한번만 실행된다. 결과가 다른 모듈에 export되는것이다.

## CommonJS 모듈 시스템
- CommonJS: 자바스크립트를 서버사이드 애플리케이션에서도 사용하기 위해 조직된 그룹의 이름
- require, export 사용

```js
const a = require('a');
module.exports = { }
```



## ESM(ECMAScript Module System)

- ES6부터 지원하는 자바스크립트 언어의 표준 모듈시스템이다!
- export, import 문법
- mjs파일 형식은 ESM 모듈 파일을 나타낸다.
  - mjs vs js (https://ui.toast.com/weekly-pick/ko_20190805)

```js
import a from 'a';

export default b;

// type="module"을 붙여줘야함.
<script type="module" src="main.js"></script>
```

만약 서버사이드에서 ESM 방식 모듈을 사용하고 싶다면 아래와 같이 설정한다.

```js
// package.json
{
    "type": "module",
}
```

### 가짜 ESM 타입스크립트/babel의 트랜스파일링

- React와 같은 프레임워크에서 사용하는 import/export문은 사실 CommonJS 모듈시스템을 사용한 것이라 할 수 있다. (가짜 ESM) 
- babel에 의해서 트랜스파일링되면 가짜 ESM은 commonJS로 변환된다.

```js
import react from 'react'

// 위 코드를 바벨 트랜스파일링하면

"use strict";
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

### 가짜 ESM과 진짜 ESM의 차이
```js

// 가짜 ESM은 파일 확장자가 없어도 됨. 트랜스파일링하면 commonJS처럼 동작
import { Component } from "./MyComponent"


// 진짜 ESM은 파일 확장자를 반드시 붙여야함
import { Component } from "./MyComponent.js"
```

### CommonJS -  Node.js에서 후회하는 10가지 중 하나

```js
const { Component } = require('./MyComponent')

// 아래의 파일이름 모두 가능
./MyComponent
./MyComponent.js
./MyComponent.node
./MyComponent/index.js

나는 Node.js require()에서 확장자를 명시하지 않도록 한 결정을 후회한다.
브라우저 동작과 맞지않고, JS 파일을 불러오기 위해 몇 번의 파일시스템 접근을 해야한다.
```

