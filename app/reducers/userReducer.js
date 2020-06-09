import {
  ADD_USER,
  DELETE_USER,
  MAP_USER_TO_ITEMS,
  RESET_USER,
} from "../actions/types";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  const { type, id } = action;
  switch (type) {
    case ADD_USER:
      const { name } = action;
      return {
        ...state,
        userList: state.userList.concat({
          name,
          id,
          data: [],
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== id),
      };
    case MAP_USER_TO_ITEMS:
      const { items } = action;
      return {
        ...state,
        userList: mapUsers([...items], [...state.userList]),
      };
    case RESET_USER:
      return {
        userList: [],
      };
    default:
      return state;
  }
};
export default userReducer;

const mapUsers = (itemsArr, usersArr) => {
  for (let i = 0; i < itemsArr.length; i++) {
    itemsArr[i] = {
      ...itemsArr[i],
      data: itemsArr[i].data.filter(({ checked }) => checked),
    };
    const { price } = itemsArr[i];
    let totalPeopleWhoGot = itemsArr[i].data.length;
    let newPrice = (Number(price) / totalPeopleWhoGot).toFixed(2);
    itemsArr[i] = { ...itemsArr[i], price: newPrice };
  }
  for (let i = 0; i < usersArr.length; i++) {
    const { id } = usersArr[i];
    let data = [];
    for (let j = 0; j < itemsArr.length; j++) {
      if (itemsArr[j].data.some((user) => user.id === id)) {
        const { id, name, price } = itemsArr[j];
        data.push({ id, name, price });
      }
    }
    usersArr[i] = { ...usersArr[i], data };
  }
  return usersArr;
};
