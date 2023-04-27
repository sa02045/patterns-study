# Third Party

최대한 Third Party 스크립트가 주요 렌더링에 영향을 주지않도록 해야한다.

## Third Party 스크립트를 주의해야하는 이유

- 성능 문제
- 개인정보 보호 문제
- 보안문제
- 예측하기 어려움
- 의도하지않은 결과를 초래할 수 있음
- 스크립트가 레거시를 포함할수 있음
  - document.write()
- 최적화되지않은 이미지, 비디오등
- 너무많은 자바스크립트 -> 메인스레드를 바쁘게함
- 많은 네트워크 요청
- HTTP 헤더 캐싱 문제

## Third Party 예시

- GTM
- Facebook
- iframe (광고)
- Sentry
- channel talk
  
## 효율적으로 Load 하는 방법

- async , defer 속성으로 스크립트를 로드
  - 비동기로딩을 지원하는 태그만 가능
- Third Party 스크립트 최소화
- 자체 호스팅(스크립트), 서비스워쿼를 사용하여 캐싱
  - HTTP 캐싱 개선
  - 자동 업데이트가 안된다는 단점
- 리소스 힌트 (preconnect , dns-prefetch)
- 지연로딩 광고
  - 페이지 아래 광고는 페이지 아래로 스크롤할때만 불러옴

## 피해야할 것들

### document.write()

- 텍스트 문자열을 쓰는 방법
- 이미 depreciated
- 파서의 상태에 영향을 끼쳐 부정적인 영향

```js
 <script>
      function newContent() {
        document.open();
        document.write("<h1>Out with the old, in with the new!</h1>");
        document.close();
      }
    </script>
  </head>
```

### GTM 사용시 주의

- 너무 많은 이벤트 리스너를 추가하지않도록
- 너무 많은 자바스크립트를 추가하지 않도록

### 전역 범위 오염

- 변수, 함수



