import React, { useEffect, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import DisplayComponent from "./components/Display/Display";

const Home: React.FC = () => {
  const user = localStorage.getItem("user");
  const { pushState } = useNavigation();

  if (user == null) pushState("/auth");

  return (
    <>
      <DisplayComponent message={"BONJOUR"}></DisplayComponent>
    </>
  );
};

export default Home;
