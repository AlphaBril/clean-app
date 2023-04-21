import React from "react";

const Motd: React.FC<{ message: string }> = (props) => {
  return <>{props.message}</>;
};

export default Motd;
