import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './store'
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <App />
      </Router>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
