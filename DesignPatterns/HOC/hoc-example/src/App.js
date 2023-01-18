import Header from "./Header";
import Button from "./Button";
import WithLogging from "./WithLogging";
import { useState } from "react";

const EnhancedHeader = WithLogging(Header);

function App() {
  const [count, setCount] = useState(0);

  // 다음 문제점은?
  const EnhancedButton = WithLogging(Button);

  return (
    <div className="App">
      <EnhancedHeader />
      <EnhancedButton count={count} setCount={setCount} />
    </div>
  );
}

export default App;
