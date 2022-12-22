# 프로토타입

- 자바스크립트의 모든 객체는 프로토타입 하나를 가지고 있는데, 자신의 부모 역할을 하는 객체이다. 상속 개념과 같이 프러퍼티, 메서드를 상속받아 사용할 수 있다.
  - 여기서 모든 객체가 가지고 있는 프로토타입은 `[[Prototype]]` 내부 슬롯을 뜻한다. (prototype 프로퍼티가 아님)
  - `__proto__` 프러퍼티로 접근할 수 있다
- 프로토타입도 객체이다
- 프로토타입은 새로운 객체를 만들기 위한 템플릿 객체이다.
- 자바스크립트는 프로토타입 기반 언어이다. 자바와 같은 클래스 기반 언어와 객체를 상속하는 방법이 다르다.

## 생성자 함수로 인스턴스 생성하기

생성자 함수로 객체 생성을 할 수 있다

```js
const instance = new ConstructorFunction();
```

생성자 함수와 일반 함수의 차이는 `new` 연산자를 붙여 실행하느냐 차이가 있다. (모든 함수는 생성자 함수가 될수 있다!)

- 다음 관습을 따른다.
  - 첫 글자는 대문자로 시작한다

```js
someFunction(); // 일반 함수로 호출
new someFunction(); // 생성자 함수로 호출
```

생성자 함수로 호출하면 다음과정이 암묵적으로 실행된다

1. 빈 객체를 만들어 this에 할당
2. 함수 내부 코드를 실행하고, this에 프로퍼티를 추가
3. this를 반한

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

function Dog(name) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.bark = function () {
    console.log(this.name, " bark!");
  };
  // return this; (this가 암시적으로 반환됨)
}

const dog1 = new Dog("Max");
// dog1은 생성자 함수가 암묵적으로 반환한 this
```

## 생성자 함수와 프로토타입

1. 하나 객체는 하나의 프로토타입을 가진다. (객체.prototype)

2. 생성자 함수의 프로토타입도 당연히 있다.

3. 생성자 함수로 생성한 instance는 프러퍼티 `__proto__`를 가진다.

4. `instance.__proto__`는 생성자 함수의 prototype을 가리킨다(참조한다)

5. prototype은 객체이고 이를 참조하는 `instance.__proto__` 도 객체다

6. 인스턴스는 `__proto__` 프로퍼티를 참조해 부모 객체의 프러퍼티, 메서드를 상속받는것처럼 사용할 수 있다

7. `__proto__` 프로퍼티는 생략할 수 있다!

8. 생성자함수.prototype 프러퍼티는 객체이고, 이 객체는 constructor 프러퍼티를 가진다
9. constructor 프러퍼티는 원래의 생성자 함수를 가리킨다

## 질문

```js

```
