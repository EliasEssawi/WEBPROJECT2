// Ilya Zeldner
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import AppTRAIN from "./AppTRAIN.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppTRAIN />
  </StrictMode>
);
