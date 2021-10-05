import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./components/common/App/App";
import "./styles/theme.css";

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
