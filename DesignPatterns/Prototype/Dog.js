function Dog(name) {
  this.name = name;
  this.bark = function () {
    console.log(this.name, " bark!");
  };
}

const dog1 = new Dog("Max");
dog1.bark();

Dog.prototype.play = function () {
  console.log("Play");
};

dog1.__proto__ === Dog.prototype; // true
dog1.__proto__.play(); // dog1.__proto__는 Dog.prototype을 참조한다
dog1.play(); // __proto__ 프러퍼티는 생략가능하다!
