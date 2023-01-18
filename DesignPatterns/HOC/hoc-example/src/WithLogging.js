import React, { useEffect } from "react";

export default function WithLogging(WrappedComponent) {
  return function InnerComponent(props) {
    const log = (message) => {
      console.log(message);
    };

    const enhancedProps = { log };

    useEffect(() => {
      log("마운트");
    }, []);

    return <WrappedComponent {...props} {...enhancedProps} />;
  };
}
