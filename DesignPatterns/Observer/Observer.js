// Step1. Vue가 객체를 reactive하게 반응형으로 만들어준다.
function defineReactive() {
  Object.defineProperty(obj, "name", {
    get() {
      return this._name;
    },
    // Step2. 값을 변경될 때, watcher에게 알려준다.(notify)
    set(value) {
      watcher.notify(value);
    },
  });
}

class Watcher {
  // Step3. watcher는 변경사항을 notify받으면, reRender를 호출한다.
  notify(value) {
    reRender(value);
  }
}

function updateVdom() {}

// Step4. reRender는 vdom을 업데이트한다.
function reRender(value) {
  updateVdom();
}

const watcher = new Watcher();

const user = {
  name: "jo",
};
