import React from "react";
function Greeting({ name, onGreet }) {


  React.useEffect(() => {
    if (name) {
      onGreet(`Hello, ${name} !`);
    }
  }, [name, onGreet]);

  return null;
}

export default Greeting;

