import React, { useContext } from "react";
import { TitleContext } from "./App";

function TitleComponent2() {
  const { title, setTitle } = useContext(TitleContext);
  return (
    <button
      onClick={() => {
        setTitle("new Title");
      }}
    >
      hook으로 만듬 <br />
      클릭하면 글자가 바뀜{title}
    </button>
  );
}

export default TitleComponent2;
