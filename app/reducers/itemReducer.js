import { ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  itemList: [],
};

const itemReducer = (state = initialState, action) => {
  const { type, id } = action;
  switch (type) {
    case ADD_ITEM:
      const { name, price } = action;
      return {
        ...state,
        itemList: state.itemList.concat({
          name,
          price,
          id,
        }),
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
};
export default itemReducer;
