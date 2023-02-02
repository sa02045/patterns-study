class Tree {
  constructor(name) {
    // intrinsic state
    this.name = name;
  }

  // extrinsic state
  position(x, y) {
    // 나무를 x,y 위치시킨다
  }
}

class treeFactory {
  constructor() {
    this.trees = {};
  }

  create(name) {
    let tree = this.trees[name];
    if (tree) return tree;

    this.trees[name] = new Tree(name);

    return this.trees[name];
  }
}

const aTree = new treeFactory("A");
const bTree = new treeFactory("A"); // 이미 생성된 객체를 반환한다. 새로운 메모리에 객체를 생성하는 것이 아님
