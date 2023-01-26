// Toggle State를 재사용하고자 한다.

class Toggle extends React.Component {
  // Toggle 상태
  state = { on: false };

  // Toggle 상태를 업데이트하는 메서드(로직)
  toggle = () => {
    this.setState(({ on }) => ({ on: !on }));
  };

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle,
    });
  }
}

const App = () => (
  <>
    <Toggle
      // render 컴포넌트를 사용하여 Toggle 컴포넌트의 상태, 로직을 재사용한다
      render={({ on, toggle }) => (
        <div>
          {on ? "The button is on" : "The button is off"}
          <button onClick={toggle}>Toggle</button>
        </div>
      )}
    />
  </>
);

// Hooks로 대체하기
function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return { on, toggle };
}

const App2 = () => {
  const { on, toggle } = useToggle();
  return (
    <div>
      {on ? "The button is on" : "The button is off"}
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
