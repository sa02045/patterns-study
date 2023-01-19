# Mediator

- 객체간의 복잡한 상호작용 로직을 하나의 중재자 객체에 위임하여 처리하는 패턴
- 객체는 중재자 객체와의 인터페이스만 신경쓰면 된다.
- 객체간 M:N의 관계에서 M:1의 관계로 결합도를 낮출 수 있다.

<img src="https://patterns-dev-kr.github.io/static/c5a77b672b11f8fc695b903e7f366ac0/0a9d5/mediator-middleware02.jpg" width="400" />

## 예시
### 비행기와 관제탑
  - 비행기는 오로지 관제탑과 통신한다. 비행기와 비행기간의 통신은 하지 않는다.
### 채팅 서버
- 사용자들끼리 채팅 메시지를 주고 받는 것이 아니다
- 채팅 서버에 메시지를 전송하고 채팅 서버는 각 사용자에게 메세지를 전송하는 형태

#  Middleware
<img src="https://jeonghwan-kim.github.io/assets/imgs/2018/12/08/middleware.png" width="400" />


## 예시
### Express 미들웨어
https://expressjs.com/en/guide/using-middleware.html
### vue 네비게이션 가드

### Next js Middleware (12버전)
https://nextjs.org/docs/advanced-features/middleware
### Redux Middleware

미들웨어는 함수를 반환하는 함수다.

- 에러 핸들링
- 로깅
- 비동기 API 요청