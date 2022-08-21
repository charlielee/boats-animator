import * as React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./components/common/App/App";
import store from "./redux/store";
import "./styles/theme.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  </React.StrictMode>
);
