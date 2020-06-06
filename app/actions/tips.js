import * as actionType from "./types";

export const changeTip = (tip) => {
  return {
    type: actionType.CHANGE_TIP,
    tip,
  };
};

export const toggleTip = () => {
  return {
    type: actionType.TOGGLE_TIP,
  };
};
