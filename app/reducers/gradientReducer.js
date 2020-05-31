import {
  CHANGE_GRADIENT_BACKGROUND,
  CHANGE_GRADIENT_BUTTON,
} from "../actions/types";
import { getRandomColor } from "../config/randomColor";

const initialState = {
  gradientColorsBackground: Array.from(Array(2), () => getRandomColor()),
  gradientColorsButton: Array.from(Array(2), () => getRandomColor()),
};

const gradientReducer = (state = initialState, { type }) => {
  switch (type) {
    case CHANGE_GRADIENT_BACKGROUND:
      return {
        ...state,
        gradientColorsBackground: Array.from(Array(2), () => getRandomColor()),
      };
    case CHANGE_GRADIENT_BUTTON:
      return {
        ...state,
        gradientColorsButton: Array.from(Array(2), () => getRandomColor()),
      };
    default:
      return state;
  }
};
export default gradientReducer;
