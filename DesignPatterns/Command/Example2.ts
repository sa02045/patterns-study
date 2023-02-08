// 일반 Calculator 객체
class Calculator {
  constructor(public value: number = 0) {}

  add(value: number) {
    this.value += value;
  }

  sub(value: number) {
    this.value -= value;
  }
}

// 지금은 add,sub 두 명령뿐이지만 명령이 수십개로 늘어난다면???
// 명령(메서드)를 분리해보자

// Command 패턴 Calculator 객체
class Calculator2 {
  private value: number = 0;
  private history: ICommand2[] = [];

  constructor() {
    this.value = 0;
  }

  executeCommand(command: ICommand2) {
    this.value = command.execute(this.value);
    this.history.push(command);
  }

  undoCommand() {
    const command = this.history.pop()!;
    this.value = command.undo(this.value);
  }
}

abstract class ICommand2 {
  abstract execute(currentValue: number): number;
  abstract undo(currentValue: number): number;
}

class AddCommand implements ICommand2 {
  constructor(public value: number) {}

  execute(currentValue: number) {
    return currentValue + this.value;
  }
  undo(currentValue: number) {
    return currentValue - this.value;
  }
}

class SubCommand implements ICommand2 {
  constructor(public value: number) {}

  execute(currentValue: number) {
    return currentValue - this.value;
  }
  undo(currentValue: number) {
    return currentValue + this.value;
  }
}

// 1. Client
const calculator = new Calculator2();
calculator.executeCommand(new AddCommand(100));
calculator.executeCommand(new SubCommand(50));

console.log(calculator);

calculator.undoCommand();
console.log(calculator);

calculator.undoCommand();
console.log(calculator);
