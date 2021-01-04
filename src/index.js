import React from "react";
import ReactDOM from "react-dom";
import ArticleContextApi from './Context/ContextApi'
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ArticleContextApi>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ArticleContextApi>
  ,

  rootElement
);
