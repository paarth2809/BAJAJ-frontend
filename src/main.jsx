import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "ABCD123"; // Set the title to your roll number

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
