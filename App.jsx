import React from "react";
import Router from "./app/routes/Router";
import { Provider } from "react-redux";
import configureStore from "./app/reduxStore/store";
import TempScreen from "./app/screens/TempScreen";

const store = configureStore();

const App = () => {
  // return (
  //   <Provider store={store}>
  //     <Router />
  //   </Provider>
  // );
  return <TempScreen />;
};
export default App;
