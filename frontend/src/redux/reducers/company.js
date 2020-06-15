import { RECEIVED_COMPANY } from "../constants/action-types";

const initialState = {
  company: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_COMPANY:
      return { company: action.payload };
    default:
      return state;
  }
}

export default reducer;
