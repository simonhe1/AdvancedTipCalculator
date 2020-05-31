import React from "react";
import Router from "./app/routes/Router";
import { Provider } from "react-redux";
import configureStore from "./app/reduxStore/store";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
