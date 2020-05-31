import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import gradientReducer from "../reducers/gradientReducer";

const rootReducer = combineReducers({
  usersReducer: userReducer,
  gradientReducer: gradientReducer,
});

const configureStore = () => createStore(rootReducer);
export default configureStore;
