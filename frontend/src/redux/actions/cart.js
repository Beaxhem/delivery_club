import { CART_UPDATE } from "../constants/action-types";

const getCart__local = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart : [];
};

const setCart__local = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const isInCart = (item) => {
  return ifInCart(
    item,
    () => true,
    () => false
  );
};

export const ifInCart = (item, then, ifnot) => {
  const cart = getCart__local();
  let index = 0;

  for (const cart_item of cart) {
    if (cart_item.item.slug === item.slug) {
      return then(cart, index);
    }
    index++;
  }

  return ifnot();
};

export const getCart = () => {
  let cart = getCart__local();
  return updateCart(cart);
};

const remove = (cart, i) => {
  cart.splice(i, 1);

  return updateCart(cart);
};

export const removeFromCart = (item) => {
  return ifInCart(item, remove, () => {});
};

const addToCart__local = (cart, item) => {
  let isIn = false;
  for (let cart_item of cart) {
    if (item.item.slug === cart_item.item.slug) {
      cart_item.qty += 1;
      isIn = true;
      break;
    }
  }

  if (!isIn) {
    cart.push(item);
  }

  return cart;
};

export const addToCart = (item) => {
  let cart = getCart__local();

  cart = addToCart__local(cart, { item, qty: 1 });

  return updateCart(cart);
};

export const get_count = (product) => {
  let cart = getCart__local();

  for (let item of cart) {
    if (item.item.slug === product.slug) {
      return item.qty;
    }
  }
};

export const increment = (product) => {
  let cart = getCart__local();

  for (let item of cart) {
    if (item.item.slug === product.slug) {
      item.qty++;
    }
  }

  return updateCart(cart);
};

export const dicrement = (product) => {
  let cart = getCart__local();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].item.slug === product.slug) {
      if (cart[i].qty - 1 < 1) {
        cart.splice(i, 1);
      } else {
        cart[i].qty--;
      }
    }
  }

  return updateCart(cart);
};

const updateCart = (cart) => (dispatch) => {
  setCart__local(cart);
  dispatch({ type: CART_UPDATE, payload: cart });
};
