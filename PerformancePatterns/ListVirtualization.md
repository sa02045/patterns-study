# List Virtualization

| 리스트 가상화를 적용해 다량의 렌더링 성능을 최적화한다.

1. 초기 뷰를 렌더링하고 업데이트를 처리하는 데 필요한 작업량(및 시간)이 줄어듭니다.
2. DOM 노드의 과도한 할당을 방지하여 메모리 사용량을 줄입니다.

## 목록 가상화

- 목록의 수많은 요소들을 동시에 렌더링하지 않고 사용자에게 **보이는 아이템만 렌더링**하는 데에 중점을 두고 있다.
- 사용자에게 보여지는 현재 요소들만 렌더링한다.
- <img src="https://patterns-dev-kr.github.io/static/df2940958f6717fc30cac1854b1b3a59/af315/list-virtualization04.png" width=300/>

## react-window

- 리스트 가상화를 쉽게 생성하게 해주는 라이브러리
- react-virtualized를 다시 작성, 쉬운 API 제공

### overscanCount

- 스크롤할때 새롭게 렌더링이 될 떄 빈공강떄문이 깜빡임이 있을 수 있다.
- 미리 윈도위 외부에 항상 렌더링할 항목 수를 정의할 수 있다.
- 기본값은 1
- 너무 많은 항목을 overscan하면 성능에 부정적이다.

```js
<FixedSizeList
  overscanCount={4}
>
  {...}
</FixedSizeList>
```

## 슬라이딩 윈도우 알고리즘

- 아마 여기서 아이디어를 얻은 라이브러리가 아닐까?
  Q) 다음 배열에서 3개의 연속된 요소들의 합이 가장 큰 경우는??

- 동일한 크기의 윈도우를 이동시킨다.
- <img src="https://media.vlpt.us/images/rladpwl0512/post/9f2dfeab-7850-4dfd-a434-eb7c0e0f3e90/image.png" width=500/>

## react-window-infinite-loader

### 무한 스크롤 로딩

- 사용자가 수없이 스크롤한 경우 여전히 수천개의 항목으로 DOM을 채우게 된다. 이로 인해 DOM 크기가 지나치게 커져 성능에 영향을 미칠 수 있다.

<img src="https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/dKuKVjP02xWxO9LPoOuc.jpg?auto=format&w=1600" width=300/>

## content-visibility
