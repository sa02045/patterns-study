import React from "react";

function Button({ log, count, setCount }) {
  const handleClick = () => {
    log("클릭");
    setCount(count + 1);
  };
  return <button onClick={handleClick}>{count}</button>;
}

export default Button;
