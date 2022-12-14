interface Counter {
  increment(): void;
  decrement(): void;
  getCount(): number;
}

class Counter {
  instance: Counter;
  counter = 0;

  constructor() {
    if (this.instance) {
      throw new Error("이미 인스턴스가 만들어졌습니다");
    }
    this.instance = this;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  getCount() {
    return this.counter;
  }
}

const singletonCounter = new Counter();
export default singletonCounter;
