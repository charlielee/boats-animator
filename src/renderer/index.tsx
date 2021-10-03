import React from "react";
import { render } from "react-dom";
import App from "./components/App";

// Setup root node where our React app will be attached to
const root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Render the app component
render(<App />, document.getElementById("root"));
