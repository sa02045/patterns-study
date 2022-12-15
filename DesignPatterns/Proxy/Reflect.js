// Reflect만 단독으로 사용
const person = {
  name: "John",
  age: 20,
};

Reflect.set(person, "name", "Brown");
console.log(person.name); // Brown

// Proxy와 함께 사용
const user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  set(target, prop, val) {
    return Reflect.set(target, prop, val);
  },
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
