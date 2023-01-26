import React from "react";

function example({ count }) {
  if (count !== 3) {
    useEffect(() => {
      console.log("if count change, this will be print");
    }, [count]);
  }
  return <div>example</div>;
}

export default example;
