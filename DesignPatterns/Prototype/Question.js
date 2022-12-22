const arr = [1, 2];
console.log(arr.prototype); // 1
console.log(arr.__proto__); // 2
console.log(Array.prototype); // 3

function Person(name) {
  this.name = name;
  this.say = function () {
    console.log("Hello");
  };
}

const me = new Person("peter");

console.log(me.prototype); // 4
console.log(me.__proto__); // 5
console.log(Object.getPrototypeOf(me)); // 6
console.log(Person.prototype === me.__proto__); // 7

Person.prototype.bye = function () {
  console.log("bye");
};

me.__proto__.bye(); // 8
me.bye(); // 9

console.log(me.__proto__.__proto__); // 10
