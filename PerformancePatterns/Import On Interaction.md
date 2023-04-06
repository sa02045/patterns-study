# Import On Interaction

중요하지 않은 리소스는 사용자 상호작용에 따라 필요할 때 로드한다

- 사용자가 이벤트를 일으켰을 때
- 스크롤하여 뷰포트에 들어왔을 때

## 리소스를 불러오는 방법

- eager: 즉시 리소스를 불러옴
- lazy(route-based): 라우트가 변경되었을 때 리소스를 불러옴
- lazy(on interaction): 사용자가 이벤트를 일으켰을 때 불러옴(클릭)
- lazy(in viewport): 스크롤을 움직여 컴포넌트가 뷰포트에 들어올때 불러옴
- prefetch: 우선순위는 높지만, 중요 리소스보다는 늦게 불러옴
- preload: 중요 리소스로 지정, 즉시 불러옴

## facade UI

preview, placeholder, skeleton UI

- preconnect 속성을 이용하여 Mouse hover 시점에 스크립트를 불러오게 한다.

### 예시

- 유튜브 썸네일만 일단 보여주고 유저가 클릭을 하면 전체 비디오를 불러온다
- HTML, CSS만 포함하는 가짜 UI 채팅 버튼을 구현하고, 이를 클릭하면 채팅 스크립트를 다운로드하게 한다

## 구현방법

1. Javascript

- dynamic import()를 사용

```js
const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  import("lodash.sortby")
    .then((module) => module.default)
    .then(sortInput())
    .catch((err) => {
      console.log(err);
    });
});
```

2. React

- React.lazy 사용

```js
const EmojiPicker = lazy(
  () => import('./EmojiPicker')
);

const Channel = () => {
  ...
  return (
    <div>
      <MessageList />
      <MessageInput />
      {emojiPickerOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <EmojiPicker />
        </Suspense>
      )}
    </div>
  );
};
```
