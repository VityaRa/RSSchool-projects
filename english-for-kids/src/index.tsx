import ReactDOM from "react-dom";
import App from "./components/App";

import "./index.scss";
import "./styles/globals.scss";

import { Provider } from "react-redux";
import store from "./redux/store";
import { LOCAL_ITEM } from "./utils/constants";
import { hydrate } from "./redux/reducers/cardReducer";

if (process.env.NODE_ENV === "production")
  alert("Please, wait for 20th, i'll finish project, leave your contacts");

const getData = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_ITEM);
    if (persistedState) return JSON.parse(persistedState);
  } catch (e) {
    console.log(e);
  }
};

const data = getData();

if (data) {
  store.dispatch(hydrate(data));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
