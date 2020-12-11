import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Apollo from "./provider/Apollo";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Apollo>
      <App />
    </Apollo>
  </React.StrictMode>,
  document.getElementById("root")
);
