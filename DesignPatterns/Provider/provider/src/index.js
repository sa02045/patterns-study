import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 정적인 값
export const CountContext = React.createContext(0);

root.render(
  <React.StrictMode>
    <CountContext.Provider value={5}>
      <App />
    </CountContext.Provider>
  </React.StrictMode>
);
