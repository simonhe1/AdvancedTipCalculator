import { ADD_USER, DELETE_USER } from "../actions/types";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  const { type, id } = action;
  switch (type) {
    case ADD_USER:
      const { name } = action;
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
        userList: state.userList.filter((user) => user.id !== id),
      };
    default:
      return state;
  }
};
export default userReducer;
