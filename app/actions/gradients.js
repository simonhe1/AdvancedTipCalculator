import { CHANGE_GRADIENT_BUTTON, CHANGE_GRADIENT_BACKGROUND } from "./types";

export const changeGradientBackground = () => {
  return {
    type: CHANGE_GRADIENT_BACKGROUND,
  };
};

export const changeGradientButton = () => {
  return {
    type: CHANGE_GRADIENT_BUTTON,
  };
};
