import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import MainRoute from "./routes/mainRoute.jsx";
import { Provider } from "react-redux";
import {store}from "./app/Store.jsx"
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  </Provider>,
);
