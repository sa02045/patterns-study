# Dynamic Import

- 정적 Import가 많아지면 번들의 크기가 커진다.
- 번들을 나누어 런타임에 동적으로 불러올 수 있다.

## 1. 동적 import() 문법

```js
import("./math").then((math) => {
  console.log(math.add(16, 26));
});
```

- webpack은 이 문법을 만나면 앱의 코드를 분할한다.
- CRA 또는 Next.js를 사용한다면 이미 설정되어있다

## React.lazy 함수

```js
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

- React.lazy 함수의 인자는 `동적 import()를 호출하는 함수`이다
- 이 함수는 React 컴포넌트를 `default export`로 가진 모듈객체가 이행되는 Promise를 반환해야한다.
- lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야한다.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        // lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야한다.
        <OtherComponent />
      </Suspense>
    </div>
  );

```

```js
// bad
import { lazy } from "react";

function Editor() {
  // 🔴 Bad: This will cause all state to be reset on re-renders
  const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
}
```

## Vue import

````js
const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')```
````
