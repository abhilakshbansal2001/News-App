import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './Reducers/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root");
console.log("hello workd")
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
  ,

  rootElement
);

