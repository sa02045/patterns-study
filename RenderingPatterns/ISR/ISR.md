# Incremental Static Generation 

- 사이트를 구축한 후(빌드한 후) 정적 페이지를 생성하거나 업데이트할 수 있다
  - 정적페이지는 빌드타임에 생성된다. 이를 런타임에 재생성할 수 있게 해준다

- Next.js는 `getStaticProps`를 `revalidate` 옵션과 함께 사용하면 자동으로 ISR 렌더함수를 만든다

## ISG 구현하기


```js
export default function Page({ posts }) {
  return posts[0].title;
}

export async function getStaticProps() {
  return {
    props: {
      posts: [
        {
          title: 'Hello World!',
        },
      ],
    },
    revalidate: 10, // In seconds
  };
}
```


- 사용자가 페이지를 재요청하면 revalidate 시간이 지났으면 새로운 데이터를 가져와서 페이지를 재생성한다
- 아직 revalidate 시간이 지나지않았으면 새로운 요청을 하지않고 기존 페이지를 사용한다


## On Demand ISG
