import { CHANGE_TIP, TOGGLE_TIP } from "../actions/types";
const intialState = {
  tip: 15,
  toggled: true,
};

const tipReducer = (state = intialState, action) => {
  const { type } = action;
  switch (type) {
    case CHANGE_TIP:
      return {
        ...state,
        tip: action.tip,
      };
    case TOGGLE_TIP:
      return {
        ...state,
        toggled: !state.toggled,
      };
    default:
      return state;
  }
};
export default tipReducer;
