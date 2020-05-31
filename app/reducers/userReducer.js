import { ADD_USER, DELETE_USER } from "../actions/types";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, { type, name, id }) => {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        userList: state.userList.concat({
          name,
          id,
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
