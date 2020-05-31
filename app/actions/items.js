import { ADD_ITEM, DELETE_ITEM } from "./types";

let nextItemId = 0;

export const addItem = (name, price) => {
  return {
    type: ADD_ITEM,
    name: name,
    price: price,
    id: nextItemId++,
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id: id,
  };
};
