import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 5) Connect redux store with react by adding Provider */}
    {/* before using: npm i react-redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
