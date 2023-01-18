# Mediator & Middleware

- 객체간의 복잡한 상호작용 로직을 하나의 중재자 객체에 위임하여 처리하는 패턴
- 객체는 중재자 객체와의 인터페이스만 신경쓰면 된다. 그래서 다른 객체간의 결합도를 낮출 수 있다.

<img src="https://patterns-dev-kr.github.io/static/c5a77b672b11f8fc695b903e7f366ac0/0a9d5/mediator-middleware02.jpg" width="400" />


## 예시

### 채팅 서버
- 사용자들끼리 채팅 메시지를 주고 받는 것이 아니다
- 채팅 서버에 메시지를 전송하고 채팅 서버는 각 사용자에게 메세지를 전송하는 형태

### Express 미들웨어


### vue 네비게이션 가드

### Redux Middleware