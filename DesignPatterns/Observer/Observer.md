# 옵저버 패턴

GoF 패턴 중 행위 패턴에 해당

## GoF 패턴 (Gang of Four)

- 4명의 컴퓨터 공학자가 소프트웨어 디자인 패턴을 3분류 23가지로 정리한 패턴들

1. 생성패턴
   - 프로토타입, 싱글톤
2. 구조패턴
   - 프록시
3. 행위패턴 : 객체들의 상호작용 패턴
   - 옵저버

## 옵저버 패턴

- 변화를 지켜보고 알려주는 것
- 객체의 변화시 구독하고 있는 다른 객체들에게 알림
- 시스템간에 이벤트를 생성하고 수신

## 옵저버 패턴의 구성

1. Observable - 관찰당하는 대상
2. Observer - 관찰자

특정 이벤트가 발생하면 관찰당하는 대상이 관찰자에게 알린다.
관찰자는 이를

### Observable(관찰할 수 있는), Subject

- 이벤트를 발생시키는 주체
- 변화가 있을 때마다 옵저버에게 알려준다(notify)
- 변화를 관찰하는 옵저버들을 관리(등록, 삭제)

```js
class Subject {
  constructor() {
    // 옵저버 목록을 관리
    this.observers = [];
  }
  //   옵저버 등록
  addObserver(observer) {
    this.observers.push(observer);
  }
  //   옵저버 삭제
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  //   객체의 상태변화를 옵저버에게 알려준다
  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}
```

### 옵저버

- Subject가 notify하면 어떤 행동을 한다

## vue2 reactivity와 옵저버 패턴

<img src="https://v2.vuejs.org/images/data.png" width="600"/>

- Data는 Observable(관찰할 수 있는), watcher는 Observer라고 할 수 있다
- Data는 Object.definedProperty() 메서드로 새로운 객체로 정의되고 setter가 트리거 되면 watcher에게 알린다.

1. Object.definedProperty()로 Data를 Observable하게 만든다
2. setter가 트리거되면 watcher에게 변경사항을 알린다
3. watcher는 re-render 함수를 트리거하여 컴포넌트가 re-render하도록한다.
4. re-render된 컴포넌트가 가상 DOM에 업데이트된다

### Vue는 data를 Observable하게 만든다

### 1. data를 정의

<img width="349" alt="스크린샷 2023-01-05 오후 6 16 15" src="https://user-images.githubusercontent.com/104751519/210744337-a9ddbf3d-b4a7-421c-967d-fffe74490f0f.png">

### 2. observer의 참조값을 가지는 `__ob__` 프로퍼티를 할당. Observable한 객체가 되었다.

 <img width="583" alt="스크린샷 2023-01-05 오후 6 15 21" src="https://user-images.githubusercontent.com/104751519/210744213-2fbe7277-1cde-4497-a62b-b216707a966c.png" />
    
    
<img width="185" alt="스크린샷 2023-01-05 오후 6 15 41" src="https://user-images.githubusercontent.com/104751519/210744224-52ed0be8-cade-4037-a75b-d78dcf8bc618.png" />

### vue reactivity + observer 참고사이트

참고) https://handhand.tistory.com/258
참고) https://www.how-to-vue.com/vue/reactivity/simple-case.html#notify-the-dependent-when-the-subject-is-changed
