import { ADD_USER, DELETE_USER } from "./types";

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
