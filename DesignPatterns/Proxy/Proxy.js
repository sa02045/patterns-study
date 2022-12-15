const person = {
  name: "John",
  age: 20,
};

const personProxy = new Proxy(person, {
  get(obj, prop) {
    // 1. get 트랩 메서드 : 이름을 읽을 때 항상 lowerCase로 출력해보자
    if (prop === "name") {
      return obj[prop].toLowerCase();
    }
    return obj[prop];
  },
  set(obj, prop, value) {
    // 2. set 트랩 메서드 : 만약 age가 30살이상이라면 값 설정을 못하도록 Proxy 객체에서 막아보자
    if (prop === "age" && typeof value === "number" && value >= 30) {
      return;
    } else {
      obj[prop] = value;
      return true;
    }
  },
  deleteProperty(obj, prop) {
    // 3. deleteProperty : 프로퍼티를 삭제를 가로채 'age' 프로퍼티는 삭제하지 못하도록 하자
    if (prop === "age") {
      return false;
    }
    delete obj[prop];
    return true;
  },
  ownKeys(obj) {
    // 4. ownKeys : 프로퍼티 순회를 가로챈다.
  },
});

personProxy.age = 31; // origin 객체가 아닌 proxy 객체를 조작해야 트랩 메서드가 발동
personProxy.skill = "javascript"; // Proxy를 통해 새로운 프로퍼티를 추가할 수도 있다.

console.log(personProxy.age); // 20
console.log(personProxy.name); // john

console.log(person.skill); // Proxy를 통해 원본에 새로운 프로퍼티를 추가
