import ChildComponent from "./ChildComponent";
import ChildComponent2 from "./ChildComponent2";
import TitleComponent from "./TitleComponent";
import TitleComponent2 from "./TitleCompoent2";
import React, { useState } from "react";
// 동적인 값
export const TitleContext = React.createContext();

function App() {
  const [title, setTitle] = useState("default title");

  return (
    <div className="App">
      <TitleContext.Provider
        value={{
          title,
          setTitle,
        }}
      >
        <ChildComponent />
        <ChildComponent2 />
        <TitleComponent />
        <TitleComponent2 />
      </TitleContext.Provider>
    </div>
  );
}

export default App;
