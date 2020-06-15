import Axios from "axios";
import { AUTH_ERROR, LOGGED_IN } from "../constants/action-types";

const set_token = (token) => {
  localStorage.setItem("token", token);
};

export const login = (payload) => (dispatch) => {
  Axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, payload)
    .then((res) => res.data)
    .then((json) => {
      set_token(json.access_token);
      dispatch({ type: LOGGED_IN });
    })
    .catch((e) => {
      dispatch({ type: AUTH_ERROR, payload: e.response.data.message });
    });
};
