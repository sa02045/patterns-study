# Flyweight 패턴

- 동일하거나 유사한 객체들 사이에 가능한 많은 데이터를 서로 공유하여 사용하도록 하여 메모리 사용량을 최소화하는 소프트웨어 디자인 패턴

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdcH0Cv%2FbtrxwzD6Yvd%2F30eL0c8K9GSbMHcN5Hwmp0%2Fimg.png" width="500" />

- 그림을 보면 세 개의 객체가 하나의 데이터를 공유하여 메모리를 절약한다.
- 공유하는 데이터를 intrinsic state라고 한다.

## 예시

게임에서 수백만개의 나무를 어떻게 구현해야할까?
하나의 나무마다 하나의 인스턴스를 만들면 수백만개의 새로운 데이터를 가지는 인스턴스가 생긴다. 메모리가 부족해진다.

공통 데이터는 하나의 데이터를 사용하고, 다른 부분만 새롭게 만들어 사용하자!

## 구성

1. FlyweightFactory
2. Flyweight
3. Context

### FlyweightFactory

- flyweight 목록을 관리
- 기존 flyweight을 반환하거나 새로운 flyweight를 생성하여 반환한다.

### Flyweight

- intrinsic state: 고유한 상태, 다른 인스턴스와 공유하는 상태이다. 변할 수 없다.
- extrinsic state: 외부 상태, 매개변수로 전달받는 상태이다.

## intrinsic state vs extrinsic state

## 싱글톤 패턴 vs Flyweight 패턴

1. 싱글톤 인스턴스는 하나만 존재한다. Flyweight 클래스는 상태가 다른 여러 인스턴스를 가질 수 있다
