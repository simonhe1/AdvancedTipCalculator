import { ADD_USER, DELETE_USER } from "../actions/types";
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ADD_USER:
      const { name } = action;
      return {
        ...state,
        userList: state.userList.concat({
          name,
          id: uuidv4(),
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
};
export default userReducer;
