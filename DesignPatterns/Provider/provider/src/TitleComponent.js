import React from "react";
import { TitleContext } from "./App";

function TitleComponent() {
  return (
    <div>
      <TitleContext.Consumer>
        {({ title, setTitle }) => {
          return (
            <button
              onClick={() => {
                setTitle("newTitle");
              }}
            >
              클릭하면 글자가 바뀜 {title}
            </button>
          );
        }}
      </TitleContext.Consumer>
    </div>
  );
}

export default TitleComponent;
