import { ADD_USER, DELETE_USER, MAP_USER_TO_ITEMS } from "./types";

let nextUserId = 0;

export const addUser = (name) => {
  return {
    type: ADD_USER,
    name: name,
    id: nextUserId++,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id: id,
  };
};

export const mapUserToItems = (itemsArr) => {
  return {
    type: MAP_USER_TO_ITEMS,
    items: itemsArr,
  };
};
