import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReduxProvider from "./app/allProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
);
