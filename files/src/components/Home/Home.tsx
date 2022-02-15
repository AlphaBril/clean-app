import React, { useEffect } from "react";
import useAuth from "src/hooks/useAuth";
import DisplayComponent from "./components/Display/Display";

const Home: React.FC = () => {
  useEffect(() => {
    useAuth();
  }, [useAuth]);

  return (
    <>
      <DisplayComponent message={"BONJOUR"}></DisplayComponent>
    </>
  );
};

export default Home;
