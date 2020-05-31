import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import gradientReducer from "../reducers/gradientReducer";
import itemReducer from "../reducers/itemReducer";

const rootReducer = combineReducers({
  usersReducer: userReducer,
  gradientReducer: gradientReducer,
  itemsReducer: itemReducer,
});

const configureStore = () => createStore(rootReducer);
export default configureStore;
