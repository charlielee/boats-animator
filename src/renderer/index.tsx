import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./components/common/App/App";
import store from "./redux/store";
import "./styles/theme.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
