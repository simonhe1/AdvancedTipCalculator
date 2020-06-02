import {
  ADD_ITEM_NAME,
  ADD_ITEM_PRICE,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  GET_ITEM_NAME,
  GET_ITEM_PRICE,
  DELETE_ITEM,
} from "./types";

let nextItemId = 0;

export const addItemName = (name) => {
  return {
    type: ADD_ITEM_NAME,
    name: name,
    id: nextItemId++,
  };
};

export const incrementItemQuantity = (id) => {
  return {
    type: INCREMENT_ITEM_QUANTITY,
    id: id,
  };
};

export const decrementItemQuantity = (id) => {
  return {
    type: DECREMENT_ITEM_QUANTITY,
    id: id,
  };
};

export const addItemPrice = (price) => {
  return {
    type: ADD_ITEM_PRICE,
    price: price,
  };
};

export const getItemName = (id) => {
  return {
    type: GET_ITEM_NAME,
    id: id,
  };
};

export const getItemPrice = (id) => {
  return {
    type: GET_ITEM_PRICE,
    id: id,
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id: id,
  };
};
