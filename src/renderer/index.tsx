import * as React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import { router } from "./router";
import { Theme } from "./components/ui/Theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </React.StrictMode>
);
