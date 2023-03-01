// 1. command interface
// 모든 명령(command)가 구현해야 하는 인터페이스를 정의
abstract class ICommand {
  abstract execute(...args): void;
}

// 2. Command - 입금
class Deposit implements ICommand {
  execute(receiver: Receiver, { amount }) {
    receiver.setState(receiver.getState() + amount);
  }
}

// Command - 출금
class Withdraw implements ICommand {
  execute(receiver: Receiver, { amount }) {
    receiver.setState(receiver.getState() - amount);
  }
}

// 3. Receiver
class Receiver {
  private state;

  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }
}

// 4. Invoker
class BankManager {
  private receiver: Receiver;
  private commands: {};
  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  // 명령 등록
  addCommand(command: ICommand) {
    this.commands[command.constructor.name] = command;
  }

  executeCommands(commandName: string, params) {
    this.commands[commandName].execute(this.receiver, params);
  }
}

// 5. Client

const receiver = new Receiver(100);
const bankManager = new BankManager(receiver);
bankManager.addCommand(new Deposit());
bankManager.addCommand(new Withdraw());

bankManager.executeCommands("Deposit", { amount: 100 });

console.log(receiver.getState()); // 200

bankManager.executeCommands("Withdraw", { amount: 50 });

console.log(receiver.getState()); // 150
