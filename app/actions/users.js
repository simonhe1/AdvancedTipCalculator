import { ADD_USER, DELETE_USER } from "./types";

export const addUser = (user) => {
  return {
    type: ADD_USER,
    data: user,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id: id,
  };
};
