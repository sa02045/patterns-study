# PRPL Pattern

- 가장 중요한 리소스를 푸시(또는 미리 로드)합니다.
- 가능한 한 빨리 초기 경로를 렌더링합니다.
- 나머지 자산을 미리 캐시합니다.
- 다른 경로 및 중요하지 않은 자산을 지연 로드합니다.

- Push (or preload) the most important resources (첫 페이지에 중요한 리소스는 push 혹은 preload 한다)
- Render the initial route as soon as possible (첫 페이지를 빠르게 렌더한다)
- Pre-cache remaining routes (첫 페이지 외의 라우팅을 프리 캐시한다)
- Lazy-load other routes and non-critical assets (다른 중요하지 않는 리소스는 지연로딩한다)

## Preload critical resources

- preload 속성으로 리소스를 빨리 요청하도록 지시
- HTTP/2을 사용

```html
<link rel="preload" as="style" href="css/style.css" />
```

### 처음 페이지를 가능한 최대한 빨리 보여주기

- FCP 성능 증가시키기
- 초기 경로는 지연로딩하지 않기
- 중요한 자바스크립트 코드를 인라인으로 작성
- 그러나 인라인 코드는 개발관점에서 유지보수하기 어렵고, 캐시가 어렵다.
- 다른 방법은 최초 HTML 페이지를 `서버사이드렌더링`에 맡기는 것
  - HTML 가져오는 페이로드 증가. TTI에 악영향을 미칠수도

### Pre-cache assets

- Workbox같은 서비스 워커 기반 캐싱사용

### Lazy Load

- 번들을 나누고, 청크들을 preload하자

참고)

1. https://web.dev/apply-instant-loading-with-prpl/
2. https://itchallenger.tistory.com/entry/CSR-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%9C-PRPL-%ED%8C%A8%ED%84%B4-with-React
