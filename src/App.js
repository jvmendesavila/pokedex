import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteConfig from "./routes";

export default function App() {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
}
