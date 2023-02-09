// Toggle, ToggleOn, ToggleOff, ToggleButton 컴포넌트가 모여 하나의 동작을 수행하는 Compound 패턴
function App() {
  return (
    <Toggle onToggle={(on) => console.log(on)}>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <ToggleButton />
    </Toggle>
  );
}

// Context + Hook으로 상태 공유
function useToggleContext() {
  const context = React.useContext(ToggleContext);
  return context;
}

function Toggle(props) {
  // on 상태는 암시적인 상태, 외부에 내보내지 않는다
  const [on, setOn] = React.useState(false);

  useEffect(() => {
    props.onToggle(on);
  }, [on]);

  const value = React.useMemo(() => ({ on, toggle }), [on]);
  const toggle = React.useCallback(() => setOn((oldOn) => !oldOn), []);

  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  );
}

function ToggleOn({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
}

function ToggleOff({ children }) {
  const { on } = useToggleContext();
  return on ? null : children;
}

function ToggleButton() {
  const { on, toggle } = useToggleContext();
  return <button on={on} onClick={toggle} />;
}
