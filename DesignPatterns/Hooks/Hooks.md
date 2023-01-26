# Hooks 패턴

| 함수를 통해 상태를 가진 로직을 여러 컴포넌트들에서 사용한다.

- React 16.8 버전에서 추가
- React 상태, 생명 주기 함수를 class 문법없이 사용할 수 있게 해준다.

## 클래스 컴포넌트의 단점

1. ES2015 클래스에 대한 지식이 필요

   - 메서드 bind, 생성자, this 키워드는 무엇을 가리키는지
   - 클래스 컴포넌트와 함께 HOC, Render Props를 사용하는 경우 Wrapper Hell 안티패턴이 나타날 수 있음
   - 데이터의 흐름을 추적하기 어렵고 동작을 예측하기 아려움

2. 클래스 컴포넌트를 재사용하기 위해 `HOC패턴`이나 `Render Prop패턴`을 사용하면 결국엔 컴포넌트를 재구성해야한다. Wrapper Hell 안티패턴이 나타날 수 있다.

```js
<WrapperOne>
  <WrapperTwo>
    <WrapperThree>
      <WrapperFour>
        <WrapperFive>
          <Component>
            <h1>Finally in the component!</h1>
          </Component>
        </WrapperFive>
      </WrapperFour>
    </WrapperThree>
  </WrapperTwo>
</WrapperOne>
```

3. 클래스 컴포넌트는 로직의 응집도가 낮아진다.
   - 로직들이 응집되어 있지않고 흩어져있음

<img src="https://patterns-dev-kr.github.io/static/e7c7779aca248f5471a3753fa4f175ed/2b73a/hooks02.png" width="1000" />

## Hooks

Hooks는 세가지 역할을 한다.

- 함수형 컴포넌트에 상태를 추가
- 생명주기 메서드 없이 컴포넌트의 생명 주기를 관리
- 상태를 가진 로직을 앱 전체 컴포넌트에서 재사용

### State Hook

함수형 컴포넌트에서 상태관리를 위한 useState 훅

### Effect Hook

- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 생명주기 메서드를 조합한듯한 효과를 낸다.

```js
componentDidMount() { ... }
useEffect(() => { ... }, [])

componentWillUnmount() { ... }
useEffect(() => { return () => { ... } }, [])

componentDidUpdate() { ... }
useEffect(() => { ... })
```

### useEffect의 의존배열

## Custom Hooks

- React의 기본 빌트인 훅을 사용하여 커스텀 훅을 만들 수 있다.
- 모든 훅은 `use`로 시작해야한다.

## Hooks의 장점

- 코드를 관심사와 기능에 따라 분리할 수 있다.
- 컴포넌트를 단순화해준다. 컴포넌트의 로직과 뷰를 분리할 수 있다

## Hooks의 단점

- 규칙에 따라 작성해야한다. lint 없이는 어떤 규칙을 어기고 있는지 알기 힘들다.

## Hooks 규칙 두가지

### 1. 최상위 레벨에서만 호출해야한다.

- 루프, 조건, 중첩 함수내에서 Hooks를 호출하면 안된다.
- React 함수의 최상위 수준에서 Hooks를 호출해야한다.

```js
// Error
if (count !== 3) {
  useEffect(() => {
    console.log("if count change, this will be print");
  }, [count]);
}
```

### 2. 리액트 함수에서만 호출해야한다.

- 일반 자바스크립트 함수에서 Hooks를 호출하면 안된다.
- 단, 커스텀 Hooks내에서 Hooks를 호출할 수 있다
