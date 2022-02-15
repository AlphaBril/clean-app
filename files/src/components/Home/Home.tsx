import React from "react";
import useAuth from "src/hooks/useAuth";
import DisplayComponent from "./components/Display/Display";

const Home: React.FC = () => {
  useAuth();

  return (
    <>
      <DisplayComponent message={"BONJOUR"}></DisplayComponent>
    </>
  );
};

export default Home;
