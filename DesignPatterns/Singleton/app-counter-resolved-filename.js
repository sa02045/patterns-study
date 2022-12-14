const counter1 = require("./counter.js");
const counter2 = require("./COUNTER.js");

// 파일 시스템은 대소문자를 구분하지않고 같은 파일을 가르킨다.

counter1.increment();

// 하지만 Node.js가 모듈을 싱글톤 패턴을 사용하기 위해서는 캐시 키로 모듈의 절대 파일 경로를 사용한다.
// 때문에 counter1과 counter2는 다른 모듈(코드조각)으로 인식된다

console.log(counter1.get()); // 0
console.log(counter2.get()); // 1
