import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppContextProvider from "./components/AppContextProvider.tsx";
import { ThemeProvider } from "@emotion/react";
import { THEME } from "./styles/base.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={THEME}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>
);
