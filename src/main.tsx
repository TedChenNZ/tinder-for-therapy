import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StyleProviders } from "./StyleProviders";

ReactDOM.render(
  <React.StrictMode>
    <StyleProviders>
      <App />
    </StyleProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
