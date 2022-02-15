import React from "react";
import Routes from "./App.route";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
