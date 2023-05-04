# Next.js의 성능향상

## 성능지표 정리 - Core Web Vitals 중심

Web Vitals 중에서 중요한 Core Web Vitals

- LCP: 메인 콘텐츠가 얼마나 빨리 로드되는지
- FID: 사용자가 페이지와 처음 상호 작용할 때부터 해당 상호 작용에 대한 응답으로 브라우저가 실제로 이벤트 핸들러 처리를 시작하기까지의 시간
- CLS: 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도

### 성능지표 측정 도구

- [pagespeed](https://pagespeed.web.dev/)
- [CrUX](https://lookerstudio.google.com/reporting/bbc5698d-57bb-4969-9e07-68810b9fa348/page/keDQB?params=%7B%22origin%22:%22https:%2F%2F8percent.kr%22%7D)


### 이 아티클에서 얘기하는 Web Vitals

- FCP
- LCP
- TTI
- TBT(Total Blocking Time): 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때 FCP와 TTI 사이 총 시간을 측정합니다.
  - 메인스레드에서 50ms이상 실행되는 작업(긴 작업)이 있을 때마다 메인 스레드는 차단된것으로 간주
- CLS

## 1. 3P(써드파티) 라이브러리 대체

- 가벼운 라이브러리로 대체하여 성능 향상

### 1.1 기존 라이브러리를 가벼운 라이브러리로 대체

`Font-Awesome` -> `@svgr/webpack`
`react-select` -> `react-select-search`
`React-Slick` -> `react-glider`
`React-rating` -> `react-stars`

- 가벼운 라이브러리로 대체
- 전체 라이브러리를 가져오는 대신 필요한 아이콘만 import (트리쉐이킹)
- 청크 크기 감소
- Parsed Size 감소

### webpack-bundle-analyzer 지표

<img src="https://patterns-dev-kr.github.io/ddbab5f7301ea699ffb7a8775255990a/optimizing-core-web-vitals-on-a-nextjs-app10.avif" width="500"/>

- Stat size: 모듈의 실제 소스 코드 크기 `minification 또는 압축 전 크기`
- Parsed size: `minification` 후의 크기 (UglifyJS, terser)
- Gzipped size: 각 모듈을 개별적으로 gzip을 실행하여 압축한 크기. 하지만 실제 압축 방법과는 다르기 때문에(각 모듈을 개별적으로 압축하는것은 비효율) 실제 파일 크기와 1대1 매핑이 되지 않습니다.

#### 1.2 라이브러리를 제거하고 직접 구현

`react-burger-menu` -> `커스텀 컴포넌트 구현`

제거한 이유

- 라이브러리의 모든 기능이 필요없다고 판단
- 직접 만들 수 있을것 같음

## 2. 코드 스플리팅

닫힌 상태로 렌더링되는 메뉴 컴포넌트(햄버거)를 필요할때에만 불러오도록 구현 (지연로딩)

- 지연로딩 lazy() 유사하게 동작하는 LazyLoadingErrorBoundary() 라이브러리를 적용


### React ErrorBoundary
- react class component의 getDerivedStateFromError 라이플 사이클 메서드를 사용
- 클래스 컴포넌트에만 있음. function component의 hook에는 존재하지 않음


getDerivedStateFromError: 자식 컴포넌트에서 오류가 발생했을 때 render 단계에서 호출됨
componentDidCatch: 자식 컴포넌트에서 오류가 발생했을 때 commit 단계에서 호출됨

render: DOM 갱신을 위하 이전과 이후를 비교하여 변경사항을 계산하는 단계
commit: 비교를 끝내고 DOM에 직접적으로 갱신될 내용을 적용하는 단계

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

    // render 단계에서 error를 확인하고 hasError State를 true로 변경
  static getDerivedStateFromError(error) {
    return { hasError: true,error };
  }

    // commit 단계에서 에러 핸들링 호출
  componentDidCatch(error, info) {
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```


## 3. 중요 리소스 인라이닝과 중요하지 않은 리소스 지연 처리

### render-blocking resources 최적화

중요 CSS를 인라인

## 4. CLS(누적 레이아웃 이동) 개선

<img src="https://web-dev.imgix.net/image/admin/74TRx6aETydsBGa2IZ7R.png?auto=format&w=1600" width="500"/>

### CLS 발생 원인
- 크기가 정해지지 않은 이미지
- 크기가 정해지지 않은 광고, 임베드 및 iframe
- 동적으로 주입된 콘텐츠
- FOIT/FOUT을 유발하는 웹 글꼴
- DOM을 업데이트하기 전에 네트워크 응답을 대기하는 작업

### 4.1 크기가 정해지지 않은 이미지 해결해보기
- image, video 태그에 width, height 크기 속성을 포함시키기
- 종횡비 상자(aspect-ratio-box)를 사용하여 필요한 공간을 확보하기

`반응형 웹 디자인이 도입되며 width와 height를 생략하고, 대신 CSS를 사용하여 이미지 크기를 조정하기 시작했습니다.`
- 이미지가 다운로드되기 시작하고 브라우저가 크기를 결정할 수 있을 때만 이미지에 대한 공간을 할당할 수 있다는 것
- 여기서 종횡비가 등장
- 종횡비란 너비와 높이의 비율로 16:9 또는 4:3
- 즉, 크기 중 하나를 알고 있으면 다른 크기를 결정할 수 있다는 의미
### Aspect Ratio Box (종횡비 박스)
https://codepen.io/chriscoyier/pen/BZNoev

- 56.25% -> 16:9 

- https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
```css
aspect-ratio: 16 / 9;
```


### 반응형 이미지
- 3~5개의 서로 다른 크기의 이미지를 제공하여 성능을 향상
```html
<img
  width="1000"
  height="1000"
  src="puppy-1000.jpg"
  srcset="puppy-1000.jpg 1000w, puppy-2000.jpg 2000w, puppy-3000.jpg 3000w"
  alt="강아지와 풍선"
/>

// 또는

<picture>
  <source media="(max-width: 799px)" srcset="puppy-480w-cropped.jpg" />
  <source media="(min-width: 800px)" srcset="puppy-800w.jpg" />
  <img src="puppy-800w.jpg" alt="강아지와 풍선" />
</picture>
```

## 4. API호출 순서 최적화
사용자가 영화 앱에 처음 방문했을 때 영화 API를 유명한 순으로 1페이지를 호출할 것이라는 것을 알고 있다
- 이게 좋은 방법인지는...?
```html
<link
  rel="preload"
  as="fetch"
  href="https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&page=1"
  crossorigin="true"
/>
```


### 연관성없는 비동기 요청을 동시에(병렬로) 하기
- Promise.all()
```js
function multiply5 (number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = number * 5;
 
      console.log(result);
      resolve(result);
    }, 1000);
  });
}
 
Promise.all([
  multiply5(5),
  multiply5(10),
  multiply5(20)
]).then(result => {
  console.log('result', result);
});
```

- Promise.race(): 가장 먼저 처리되는 응답을 반환
```js
function multiply2 (number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = number * 2;
 
      resolve(result);
      console.log('result', result);
    }, 1000 * number);
  });
}
 
Promise.race([
  multiply2(3),
  multiply2(2),
  multiply2(1)
]).then(result => {
  console.log('final result', result);
});
```

### 이미지 preload

```html
<link
  rel="preload"
  href="{LOGO_IMAGE_PATH}"
  as="image"
  media="(min-width: 80em)"
/><link
  rel="preload"
  href="{DARK_TMDB_IMAGE_PATH}"
  as="image"
  media="(prefers-color-scheme: dark) and (min-width: 80em)"
/><link
  rel="preload"
  href="{LIGHT_TMDB_IMAGE_PATH}"
  as="image"
  media="(prefers-color-scheme: light) and (min-width: 80em)"
/>
```

## 6. 사이트를 반응형으로 만들기

1. css media query
2. window 프러퍼티의 width에 반응

### SSR에서는 반응형 디자인이 까다롭다
이유
1. 렌더링되는 서버에서는 클라이언트의 window 요소를 알 수 없다.
2. CSS 미디어 쿼리를 사용할 경우 데스크탑이던 모바일이던 상관 없이 모든 요소가 렌더링된다.


https://eightpercent.slack.com/archives/CPR03G1NC/p1660728739411639
```html
<img class="pc" /> // 모바일에서도 이미지를 다운로드한다!!

.pc {
  @include respond-to(sm) {
    display: none !important;
  }
}
```


`@artsy/fresnel` 라이브러리 사용하여 SSR에서 반응형을 해결
- https://github.com/artsy/fresnel




## next/Image는 무엇을 하는가

### 빌트인(built-in) 최적화 기능


1. 성능 향상: 디바이스에 맞는 이미지 사이즈, 이미지 포맷을 사용하게 해준다
2. 자동으로 브레이크 포인트에 맞는 이미지 source set을 생성하여 CLS을 막아준다
3. 자동 지연로딩: viewport에 들어올때만 load됨
4. Placeholder 기능
    - CLS를 방지하기 위해 placeholder 기능을 제공, blur 또는 empty
5. 이미지 포맷 변경 (jpeg -> webp)

로컬 이미지(정적)와 리모트 이미지(동적)이 조금 다르다
### 로컬 이미지

- 빌드타임에 판단할 수 있는 정적 이미지
- width, height를 명시하지 않아도 next.js가 알아서 인식
  - CLS 방지


```js
import Image from 'next/image'
import profilePic from '../assets/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} 자동으로 제공
        // height={500} 자동으로 제공
        // blurDataURL="data:..." 자동으로 제공
        // placeholder="blur" // 옵션
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

```

### 리모트 이미지

- 빌드타임에 알 수 없는 이미지
- src: URL 문자열(상대값, 절대값)
```js
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

```


### Priority 프러퍼티
- 지연로딩을 하지않고 preload된다!
- 필요한 LCP 엘리먼트에 사용하자

```js
<Image
    src="/me.png"
    alt="Picture of the author"
    width={500}
    height={500}
    priority
/>
```


### loader 프러퍼티

- image URL을 얻기위한 함수
- 동적으로 변화는 이미지를 얻을 때 사용하면 될듯
```js
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```


### sizes
- breakpoint에 따라서 제공될 이미지 정보