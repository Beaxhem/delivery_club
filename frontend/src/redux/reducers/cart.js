import { CART_UPDATE } from "../constants/action-types";

const initialState = {
  items: [],
  total: 0,
};

const getTotal = (cart) => {
  if (cart) {
    let total = 0;

    for (let item of cart) {
      total += item.qty * item.item.price;
    }

    return total;
  }
  return 0;
};

const cart = (state = initialState, action) => {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    state.items = cart;
  } else {
    state.items = [];
  }

  state.total = getTotal(cart);

  switch (action.type) {
    case CART_UPDATE:
      return {
        ...state,
        items: action.payload,
        total: getTotal(action.payload),
      };

    default:
      return state;
  }
};

export default cart;
