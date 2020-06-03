import {
  ADD_ITEM_NAME,
  ADD_ITEM_PRICE,
  GET_ITEM_NAME,
  GET_ITEM_PRICE,
  DELETE_ITEM,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  MAP_ITEM_TO_USERS,
  CHANGE_ITEM_CHOICE,
} from "../actions/types";

const initialState = {
  itemList: [],
};

const itemReducer = (state = initialState, action) => {
  const { type, id } = action;
  switch (type) {
    case ADD_ITEM_NAME:
      const { name } = action;
      const index = checkDuplicate(name, state.itemList);
      // If there is a duplicate
      if (index !== -1) {
        return {
          ...state,
          itemList: updateQuantityAtIndex(index, state.itemList),
        };
      }
      // If no duplicate just simply append to list
      return {
        ...state,
        itemList: addNewItem(name, id, state.itemList),
      };
    case INCREMENT_ITEM_QUANTITY:
      return {
        ...state,
        itemList: incrementQuantity(id, state.itemList),
      };
    case DECREMENT_ITEM_QUANTITY:
      return {
        ...state,
        itemList: decrementQuantity(id, state.itemList),
      };
    case ADD_ITEM_PRICE:
      const { price } = action;
      return {
        ...state,
        itemList: changePrice(id, price, state.itemList),
      };
    case MAP_ITEM_TO_USERS:
      const { users } = action;
      return {
        ...state,
        itemList: mapItems(state.itemList, users),
      };
    case CHANGE_ITEM_CHOICE:
      const { userID } = action;
      return {
        ...state,
        itemList: changeUserChoice(id, userID, state.itemList),
      };
    case GET_ITEM_NAME:
      console.log("got item name");
      return state;
    case GET_ITEM_PRICE:
      console.log("got item price");
      return state;
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
};
export default itemReducer;

const checkDuplicate = (name, arr) => {
  let duplicateIndex = -1;
  arr.some((list, index) => {
    if (list.name.toLowerCase() === name.toLowerCase()) {
      duplicateIndex = index;
      return true;
    }
    return false;
  });
  return duplicateIndex;
};

const updateQuantityAtIndex = (index, arr) => {
  let copy = [...arr];
  const { quantity } = copy[index];
  copy[index] = {
    ...copy[index],
    quantity: quantity + 1,
  };
  return copy;
};

const addNewItem = (name, id, arr) => {
  return arr.concat({
    name,
    id,
    quantity: 1,
    price: "-1",
  });
};

const incrementQuantity = (id, arr) => {
  return arr.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : { ...item }
  );
};

const decrementQuantity = (id, arr) => {
  return arr.map((item) => {
    if (item.id === id) {
      const { quantity } = item;
      let newQuantity = quantity === 1 ? quantity : quantity - 1;
      return { ...item, quantity: newQuantity };
    }
    return { ...item };
  });
};

const changePrice = (id, price, arr) => {
  return arr.map((item) => {
    if (item.id === id) {
      if (price) {
        return {
          ...item,
          price,
        };
      }
      return {
        ...item,
        price: "-1",
      };
    }
    return { ...item };
  });
};

const mapItems = (itemsArr, usersArr) => {
  return itemsArr.map((item) => {
    return {
      ...item,
      data: usersArr.map(({ name, id }) => {
        return { name, id, checked: false };
      }),
    };
  });
};

const changeUserChoice = (itemID, userID, arr) => {
  return arr.map((item) => {
    if (item.id === itemID) {
      const { data } = item;
      return {
        ...item,
        data: data.map((user) => {
          const { checked } = user;
          return user.id === userID
            ? { ...user, checked: !checked }
            : { ...user };
        }),
      };
    }
    return { ...item };
  });
};
