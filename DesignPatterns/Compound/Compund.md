# Compound 패턴

Compound: 화합물, 합성어, 혼합물

## Compound 패턴이란?

- 하나의 작업을 위해 여러 컴포넌트를 만들어 역할을 분담하게 한다
- Front,React) 단일 작업을 수행하기 위해 함께 작동하는 여러 컴포넌트를 생성하는 패턴
- 일반적인) 디자인 패턴이 혼합된 디자인 패턴

### 아래 코드는 좋은 API를 가지고 있을까?

- 메뉴 컴포넌트에서 items를 받아 메뉴아이템을 렌더링

```js
function App() {
  return (
    <Menu
      items={[
        { contents: "Download", onSelect: () => alert("Download") },
        { contents: "Create a Copy", onSelect: () => alert("Create a Copy") },
        { contents: "Delete", onSelect: () => alert("Delete") },
      ]}
    />
  );
}
```

// Compound 패턴을 적용하여 여러 컴포넌트를 사용하여 동작을 수행

```js
function App() {
  return (
    <Menu>
      <MenuList>
        <MenuItem onSelect={() => alert("Download")}>Download</MenuItem>
        <MenuItem onSelect={() => alert("Copy")}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert("Delete")}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
```

### 장점

- 유연한 API, API 복잡함 감소
- props drilling을 피할 수 있음
- 유연한 마크업
- 구성 요소(컴포넌트)간 관계를 표현할 수 있음
- 각각 구성요소별로 별개의 컴포넌트로 분리할 수 있게 됨
- SRP(Single Responsibility Principle): 컴포넌트 각각 본연의 기능과 역할

## 예시) HTML select

```html
<select>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
  <option value="value3">key3</option>
</select>

// 짝꿍없이는 동작하지 않는다. // 짝꿍없이 단독으로 작동하는 API를 작성하려면
아래와 같이 복잡해진다

<select options="key1:value1;key2:value2;key3:value3"></select>
```

### React에서 구현 방법

여러 컴포넌트가 하나의 동작을 수행하기 위해서는 결국 상태를 공유해야한다.

1.  React Context
2.  Hooks
3.  둘다 사용

## 제어의 역전 (Inversion Of Control, IoC)

| 내부에 있는 제어를 외부로 역전시키는 것

- 제어를 역전하는 것
- 예시) callback 함수

### React에서는

프로퍼티를 통해 외부에서 들어온 상태 값과 콜백 함수를 사용함으로써 외부에서 컴포넌트의 상태를 컨트롤할 수 있게 합니다.

```js
// 예제 map 함수
// map이 가지고 있어야할 제어를 역전하여 callback 함수로 제어를 컨트롤한다.

array.map((item) => {
  return <div>{item}</div>;
});
```
