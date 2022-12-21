import React, { useContext } from "react";
import { CountContext } from ".";

function ChildComponent2() {
  const value = useContext(CountContext);
  return <h1>{value}</h1>;
}

export default ChildComponent2;
