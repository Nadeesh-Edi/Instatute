import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "App";

// Redux store imports
import { store } from "store";
import { Provider } from "react-redux";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </AlertProvider>
  </Provider>
);
