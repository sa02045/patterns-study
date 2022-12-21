import React from "react";
import { CountContext } from ".";

function ChildComponent({ count }) {
  return (
    <div>
      <CountContext.Consumer>
        {(value) => <h1>{value}</h1>}
      </CountContext.Consumer>
    </div>
  );
}

export default ChildComponent;
