import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import gradientReducer from "../reducers/gradientReducer";
import itemReducer from "../reducers/itemReducer";

const rootReducer = combineReducers({
  itemsReducer: itemReducer,
  usersReducer: userReducer,
  gradientReducer: gradientReducer,
});

const configureStore = () => createStore(rootReducer);
export default configureStore;
