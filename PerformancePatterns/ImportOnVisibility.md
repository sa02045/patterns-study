## (브라우저) viewport

- 현재 화면에 보여지고 있는 화면 (브라우저의 메뉴바, 탭영역을 제외)

- 디바이스 크기마다 다르다
- 웹 문서가 뷰포트보다 큰 경우 스크롤이 생긴다

### viewport 메타 태그

- 애플이 모바일브라우저의 뷰포트 크기 조절을 위해 만든 태그
- 웹사이트들이 브라우저에서 viewport를 계산할 때 참고한다

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### 모바일 뷰포트와 PC 뷰포트는 다르다

### 크기구하는 방법

```js
document.element.clientWidth;

window.innerWidth;

window.outerWidth;

document.element.offsetWidth;

window.screen.width;
```

## img lazy

- 브라우저 수준에서 이미지 지연 로딩이 가능해졌다
- loading 속성을 사용

```html
<img loading="lazy" />
```

## Intersection Observer API
