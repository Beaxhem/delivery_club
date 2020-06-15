import { AUTH_ERROR, LOGGED_IN } from "../constants/action-types";

const initialState = {
  error: "",
  redirect: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return { error: action.payload };
    case LOGGED_IN:
      return { redirect: true };
    default:
      return state;
  }
};

export default auth;
