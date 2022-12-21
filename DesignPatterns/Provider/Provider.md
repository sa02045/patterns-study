# Provider 패턴

- 생산자 소비자(Producer + Consumer) 패턴과 구분할 것. 서로 비슷한 점도 있고 다른 점도 있음

- Provider 컴포넌트와 Consumer 컴포넌트로 이루어진다.

- Provider 컴포넌트는 Application의 전역 상태를 저장한다. Consumer 컴포넌트는 이 전역 상태에 접근하고 수정할 수 있다.

## Props drilling 문제

컴포넌트 트리에서 여러 중간 컴포넌트들을 거치며 props를 부모에서 자식 컴포넌트로 내려주는 패턴

### 단점

- 컴포넌트 깊이가 깊어질 수록 데이터의 추적이 어려워진다. 데이터가 어디에서 왔는지 추적이 어렵다.
- 하나의 prop을 수정하기만 하도 나머지 모든 컴포넌트의 prop을 수정해야한다. 변경에 취약하다.
- 데이터를 직접 사용하지 않는 중간 컴포넌트도 prop을 받아야한다. 데이터가 변경되는 노출취약점이 커진다.

### 해결법

- props drilling에 의존하지 않고 컴포넌트가 직접 데이터에 접근할 수 있어야한다.
- Provider 패턴을 사용하면 깊이가 깊은 컴포넌트들도 데이터에 직접적으로 접근할 수 있다

## 사례 - react context api

### 1. Context 객체 만들기

createContext API를 사용해서 Context 객체를 만들 수 있다.

```js
const MyContext = React.createContext(defaultValue);
```

- defaultValue는 Consumer 컴포넌트가 Provider를 찾지 못했을 때 사용하는 기본값이다.

### 2. Provider 컴포넌트 만들기

```js
<MyContext.Provider value={/* 어떤 값 */}>
```

- Provider 컴포넌트는 Context를 구독하는 Consumer 컴포넌트들에게 Context의 변화를 알려준다.
- Context를 구독하는 Consumer 컴포넌트는 Provider의 value prop값이 바뀔때마다 리렌더링된다. (부모 컴포넌트가 리렌더링되지 않더라도 자식 컴포넌트가 Context를 구독하고 있다면 리렌더링될 수 있다)

- Context의 값이 변화했는지 여부는 Object.is()와 같은 알고리즘을 사용하여 비교한다

### 3-1. Consumer 컴포넌트 만들기

```js
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

- Context의 변화를 구독하는 컴포넌트이다
- Consumer의 자식은 함수여야한다.
  - context의 현재값 value를 받고 React Node를 반환한다.

```js
<CountContext.Consumer>{(value) => <h1>{value}</h1>}</CountContext.Consumer>
```

### 3-2. Hooks을 사용하여 Consumer 컴포넌트 만들기

```js
function ChildComponent2() {
  const value = useContext(CountContext);
  // 또는 setValue 메서드를 포함하고 있으면
  const { value, setValue } = useContext(CountContext);
  return <div>{value}</div>;
}
```

### 동적인 Context 만들기

```js
export const TitleContext = React.createContext();

function App() {
  // 상태 선언하기
  const [title, setTitle] = useState("default title");

  return (
    <div className="App">
      <TitleContext.Provider
        value={{
          title,
          setTitle,
        }}
      >
        <TitleComponent />
      </TitleContext.Provider>
    </div>
  );
}
```

### createContext

- context api는 전역 상태를 만들어 컴포넌트가 데이터를 공유할 수 있도록 만든 방법이다.

### 단점

- context api로 전역 상태를 참조하는 컴포넌트는 재사용하기 어렵다
