# Next.js

## 클라이언트와 서버 사이 어디엔가

<img src="https://nextjs.org/static/images/learn/foundations/next-app.png" width="600"/>


### 런타임, 빌드타임 렌더링
Next.js는 런타임, 빌드타임 모든 타임에 렌더링을 한다.

- 런타임, 서버사이드 렌더링 (getServerSideProps) - Next v12
- 빌드타임 렌더링 (getStaticProps) - Next v12


### Next.js 13버전 Data Fetching

이제 Next.js 13버전에서는 getStaticProps, getServerSideProps, getStaticPaths등의 Data Fetching 함수는 더이상 필요하지 않다.

fetch의 cache, revalidate의 옵션을 설정하여 서버사이드 렌더링과 정적 렌더링을 동시에 사용할 수 있다.


### 서버 컴포넌트... 다음 시간