# preload

| 중요한 리소스들의 로딩순서를 수동으로 지정할수있다

- 특정 리소스를 빠르게 로딩하도록 우선순위를 부여
- 미리 로드된 리소스를 캐시하므로 필요 시 즉시 사용할 수 있습니다.

```html
<head>
  <link rel="preload" as="script" href="super-important.js" />
  <link rel="preload" as="style" href="critical.css" />
</head>
```

- href: 리소스의 path
- as: 리소스의 유형
- type으로 리소스의 MIME 유형지정
  - 브라우저는 type 속성값을 확인하고 지원하는 경우에만 다운로드, 그렇지않으면 무시

## preload할 수 있는 유형

- audio
- document
- fetch
- font
  - crossorigin 속성을 설정해야한다.
- image
- style
- script

### CORS

- fetch, XMLHttpRequest, fonts는 crossorigin attribute가 필요하다

```html
<link
  rel="preload"
  href="fonts/cicle_fina-webfont.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### webpack에서 preload

- 매직 Comment로 preload 사용

```js
const EmojiPicker = import(/* webpackPreload: true */ "./EmojiPicker");
```

### 권장사항 정리

- HTTP 헤더에 preload를 포함하면 다른 모든 리소스보다 우선시되어 다운로드 된다.
- preload 리소스들은 파서가 발견하는 순서대로 로드된다. 따라서 HTML의 시작 부분에 포함시킬때 주의가 필요하다.
- 폰트 preload는 head의 마지막이나 body의 시작지점에 코드를 두는 것이 적합하다.
- preload처리 된 이미지들은 따로 지정하지 않는 한 낮은 우선순위를 갖게 된다.
- preload로 지정된 모듈보다 이를 import하여 사용하는 스크립트 태그들이 먼저 로드되어야 한다
