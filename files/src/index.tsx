import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./store/configure";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "src/utils/i18n/i18n";

ReactDOM.render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
