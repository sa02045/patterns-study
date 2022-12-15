# Proxy 패턴

## Proxy

- 대리인, 대리(행위)라는 뜻
- 원본 객체를 직접 조작하는 것이 아니라 Proxy 객체를 통해 조작한다.
  - 직접 조작하지 않고 Proxy 객체를 통해 조작하는 이유는 프로퍼티 조회 및 변경 지점을 하나로 모을 수 있어 유리한 점이 있음

```js
const proxy = new Proxy(origin, handler);

proxy.property = value;
```

Proxy 인스턴스를 생성하여 Proxy 객체를 생성할 수 있다.

- 첫 번째 인자에는 원본 객체
- 두 번째 인자에는 핸들러를 정의한다.
  - 핸들러에는 동작을 가로채는 "트랩" 메서드가 담겨있다.
  - get: 프로퍼티에 접근할 때 실행되는 메서드
  - set: 프러퍼티 값을 수정할 때 실행되는 메서드

## 자바스크립트 객체 내부 메서드와 트랩

- 자바스크립트 객체는 "내부 메서드"(internal method)(또는 내부 슬롯)를 가지고 있다.

  - 객체를 조작할때 내부 메서드가 관여한다. (property에 접근하면 `[[Get]]`이 관여)
  - 내부 메서드는 개발자가 코드를 통해 직접 불러올 수 없다.
  - `[[Get]]` `[[Set]]`

- 예를 들어, 함수를 호출하면 내부 메서드 `[[Call]]`이 호출된다. 생성자 함수로 호출하면 내부 메서드 `[[Construct]]`가 호출된다.

- 내부 메서드에는 1대1 대응하는 Proxy의 트랩 메서드가 있다.
-

```js
function foo() {}
// 일반적인 함수로서 호출 : [[Call]] 이 호출
foo();
// 생성자 함수로서 호출: [[Construct]] 가 호출
new foo();
```

## proxy의 한계

proxy는 target의 내부 메서드와 1대1 대응하는 트랩 메서드를 통해 가로채는 행위를 한다.
아래와 같이 내부 메서드와 1대1 대응하는 트랩 메서드가 없다면 동작하지 않는다.

```js
// Map 자료구조는 메서드 set()을 사용하면 내부 슬롯`[[MapData]]`에 직접 접근해 프로퍼티를 설정한다. (내부 메서드를 사용하지 않음)

// proxy에는 `[[MapData]]` 내부 메서드의 1대1대응하는 트랩 메서드가 없기 때문에 에러를 발생시킨다
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set("test", 1); // Error
```

# Reflect

- Reflect는 Proxy처럼 명령을 가로채는 메서드(트랩)을 제공하는 객체이다.

- 반드시 Proxy와 함께 사용해야하는 것은 아니다

## Proxy와 차이점

```js
Reflect.<method>
```

- new 연산자와 함께 호출할 수 없는 정적으로 사용되는 객체 (Math, JSON과 같은)
  - 함수 객체가 아닌 일반 객체
- Proxy의 모든 트랩을 Reflect의 내장 메서드가 동일하게 지원한다.

## Reflect 트랩 메서드

- Reflect.get() : 객체의 프로퍼티를 읽음
- Reflect.set() : 객체의 프로퍼티값을 설정하고 true를 반환. 만약 실패한다면 false를 반환

- 등등 트랩 메서드가 있음

## Proxy와 함께 사용하기

```js
let userProxy = new Proxy(user, {
  get(target, prop) {
    return target[prop];
  },
});

// 위 코드와 아래 코드는 같다.

let userProxy = new Proxy(user, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
});
```

## Reflect를 사용하는 이유

- 깔끔한 코드
- 안정적인 호출

```js
// 1. defineProperty를 사용하면 에러가 발생할 수 있기에
const obj = {};
try {
  Object.defineProperty(obj, "prop", { value: 1 });
  console.log("success");
} catch (e) {
  console.log(e);
}

const obj2 = {};
if (Reflect.defineProperty(obj2, "prop", { value: 1 })) {
  console.log("success");
} else {
  console.log("problem creating prop");
}
```

## vue2 , vue3 의 반응성 (reactive) - 나중에 깊이 다루어보자

vue2는 Object.defineProperty를 사용하여 반응성을 구현

vue3는 Proxy를 사용하여 반응성을 구현

```js
function reactive(target) {
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      track(target, key);

      return res;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const res = Reflect.set(target, key, value, receiver);

      if (oldValue !== res) {
        trigger(target, key, value, oldValue);
      }
      return res;
    },
  });

  return proxy;
}
```
