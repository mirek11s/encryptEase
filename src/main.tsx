import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// bootstrap css files
import "bootstrap/dist/css/bootstrap.min.css";

// primereact css files
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
