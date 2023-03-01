# Static Rendering (SSG)

사이트가 빌드될 때 미리 렌더링한 HTML을 전달한다 

- 빌드타임에 렌더링한다
- 웹 앱보다는 웹 페이지라고 할 수 있다
- 유저 인터렉션이 적고 업데이트가 빈번하지 않은 경우에 적합하다
- SPA보다는 MPA(MultiPageApplication)에 적합하다


##  Static Rendering vs Server Side Rendering

- 서버사이드 렌더링은 `런타임`에 렌더링하는데, 정적 렌더링은 `빌드 타임`에 렌더링된다.
  - 정적 렌더링은 런타임에 렌더링 연산이 필요없다
  - HTML 파일을 전달하기만하면 끝!

## 언제 사용하는가?

- 정적인 콘텐츠를 보여줄 때 (블로그, 문서)
- SEO가 중요할 때 (SSR과 유의미한 차이가 있을까?)
- 빠른 로딩속도가 중요할 때 (SSR보다 빠르다)


## JAM STACK

<img  src="https://jbee.io/static/7e3f82eeaebe845d8e9059f16ab05a4f/8740f/jamstack_thumbnail.png" width="500"/>


- 특정 기술이 아니라 방법론


<img src="https://www.bottlehs.com/assets/jamstack-structure.png" width="500"/>

- J: Javascript
  - 동적인 요소 처리
  - Front-End 라이브러리, 프레임워크
  - API 요청
- A: API
- M: Markup
  - 빌드 시 페이지 생성 (Prebuilt Pages)
  - SSG

| "클라이언트 측 JavaScript, 재사용 가능한 API 및 사전 빌드된 마크업을 기반으로 하는 최신 웹 개발 아키텍처"



### SSG Framework - Gatsby

장점

- Static 페이지를 만들어주는것 뿐만아니라 필요하면 CSR, SSR, lazy loading등을 섞을 수 있다 (https://blog.banksalad.com/tech/build-a-website-with-gatsby/)
- 다양한 플러그인을 지원


### CMS (Contents Management System)
- 웹 사이트에 컨텐츠를 게시,관리할 수 있게 해주는 소프트웨어
- 개발자가 아니어도 콘텐츠를 직접 관리할 수 있음
- CRUD 작업을 손쉽게 할 수 있음
  - 백엔드 프레임워크를 사용할 필요가 없어짐

### Headless CMS vs HeadOn CMS
- 오로지 CMS만을 위해 분리되어있는 서비스라면 Headless CMS라고 할수 있음
- 기존 소프트웨어에 붙어있다면 HeadOn
- 예를들어, 장고 어드민안에서만 콘텐츠를 관리해야한다면 HeadOn
- API를 통해 분리된 아키텍처에서 콘텐츠를 관리해야한다면 Headless


콘텐츠들을 Headless CMS에 관리하고 JAMstack으로 콘텐츠를 가져와 렌더링하면 사실상 풀스택이 가능하다


CMS 서비스들
- Strapi CMS
- Netlify CMS