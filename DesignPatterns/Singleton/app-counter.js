const counter1 = require("./counter");
const counter2 = require("./counter.js");

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.get()); // print 3
console.log(counter2.get()); // 역시 print 3
