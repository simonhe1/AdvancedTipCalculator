import {
  ADD_ITEM_NAME,
  ADD_ITEM_PRICE,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  GET_ITEM_NAME,
  GET_ITEM_PRICE,
  DELETE_ITEM,
  MAP_ITEM_TO_USERS,
  CHANGE_ITEM_CHOICE,
  RESET_ITEM,
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

export const addItemPrice = (price, id) => {
  return {
    type: ADD_ITEM_PRICE,
    price: price,
    id: id,
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

export const mapItemToUsers = (userArr) => {
  return {
    type: MAP_ITEM_TO_USERS,
    users: userArr,
  };
};

export const changeItemChoice = (itemID, userID) => {
  return {
    type: CHANGE_ITEM_CHOICE,
    id: itemID,
    userID: userID,
  };
};

export const resetItem = () => {
  return {
    type: RESET_ITEM,
  };
};
