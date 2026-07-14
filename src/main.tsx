import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/main.css";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./assets/context/FavoritesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesProvider>
  </React.StrictMode>,
);
