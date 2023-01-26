# Render Props Pattern

## 1. render prop 란

- 리액트 컴포넌트간 코드를 공유하기 위해서 props를 사용하는 테크닉

| render prop로 구현된 컴포넌트는 자체적인 렌더링 로직을 구현하는 대신, react 엘리먼트를 반환하고 이를 호출하는 함수를 사용한다

```js
const Title = props => props.render()

// render prop에 react 엘리먼트를 반환하는 함수를 건낸다
<Title render={() => <h1>I am a render prop!</h1>} />
```

- Title 컴포넌트는 `prop으로 넘어온 함수를 호출하여 반환`한다. 그 외에는 아무런 일도 하지 않는다.
- Title 컴포넌트는 render prop만 바꿔가며 여러번 사용할 수 있다 (재사용)

- 개인적인 생각으로, Slot과 비슷한 느낌이라고 생각함
- `선언적`으로 어떤 요소를 렌더링할 것인지릴 명시할 수 있음

## 2. prop name이 꼭 render일 필요는 없다

```js
const Title = (props) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);

<Title
  renderFirstComponent={() => <h1>✨ First render prop! ✨</h1>}
  renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
  renderThirdComponent={() => <h3>🚀 Third render prop! 🚀</h3>}
/>;
```

## 3. 단순히 함수를 호출해 React 엘리먼트를 렌더링하는 것외에도 인자를 전달할 수 있다

```js
function Component(props) {
  const data = { ... }

  return props.render(data)
}


// data인자를 건낸다
<Component render={data => <ChildComponent data={data} />} />
```

## 장점

### 상태 끌어올리기, Props를 전달할 필요가 없다

### 개인적인 생각) 선언적 프로그래밍

```js
<Toggle
  // on, toggle에 대한 세부 구현은 숨긴다
  render={({ on, toggle }) => (
    <div>
      {on ? "The button is on" : "The button is off"}
      <button onClick={toggle}>Toggle</button>
    </div>
  )}
/>
```

## 단점

### Wrapper Hell

<img src="https://pbs.twimg.com/media/DUQ8HUQUMAADUQp?format=jpg&name=large" width="800"  />

### 주의해야할 점
