// 1. 간단 버전

class Car {
  constructor(model) {
    this.model = model;
  }
}

// 직접 인스턴스를 생성할 수도 있지만,,,,

new Car("벤츠");

// 팩토리를 통해 생성해보자
class CarFactory {
  createCar(model) {
    switch (model) {
      case "sedan":
        return new Car("sedan");
      case "suv":
        return new Car("suv");
      case "hatchback":
        return new Car("hatchback");
      default:
        throw new Error("Invalid model type");
    }
  }
}

const factory = new CarFactory();
const sedan = factory.createCar("sedan");
const suv = factory.createCar("suv");

// 2. 복잡 버전

class Employee {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

class FullTimeEmployee extends Employee {
  constructor(name) {
    super(name, "Full-Time");
  }
}

class PartTimeEmployee extends Employee {
  constructor(name) {
    super(name, "Part-Time");
  }
}

class EmployeeFactory {
  static createEmployee(name, type) {
    switch (type) {
      case "fulltime":
        return new FullTimeEmployee(name);
      case "parttime":
        return new PartTimeEmployee(name);
      default:
        throw new Error(`Invalid employee type: ${type}`);
    }
  }
}

// 어떤 생성자인지는 클라이언트는 관심이 없다.
// 만약 수십, 수백개의 생성자가 있다면?
// 관심사의 분리 또는, 객체 생성의 추상화라고 할 수 있다
// 인스턴스 생성에 대한 권한을 팩토리에 위임한다. 단일책임, 책임분리!

// employee는 FullTimeEmployee, PartTimeEmployee 생성자에 대해 관심 없다
const employeeOne = EmployeeFactory.createEmployee("John Doe", "fulltime");
const employeeTwo = EmployeeFactory.createEmployee("Jane Doe", "parttime");
const employeeThree = EmployeeFactory.createEmployee("Jim Brown", "fulltime");
