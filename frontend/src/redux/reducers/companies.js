import { RECEIVED_COMPANIES } from "../constants/action-types";

const initialState = {
  companies: [],
  last_id: 0,
  locked: false,
};

const process_data = (state, data) => {
  let c = state.companies;

  let last = 0;

  if (data.length > process.env.REACT_APP_COMPANIES_PER_PAGE) {
    last = data[data.length - 1];
    data = data.slice(0, data.length - 1);

    state.last_id = last.id;
  } else {
    if (data[data.length - 1]) {
      state.last_id = data[data.length - 1].id + 1;
    }
    state.locked = true;
  }

  if (c.length > 0) {
    state.companies = c.concat(data);
  } else {
    state.companies = data;
  }

  const length = state.companies.length;
  const per_page = process.env.REACT_APP_COMPANIES_PER_PAGE;

  if (length > per_page) {
    const index = length % per_page;
    if (index) {
      state.companies[length - index].scrollTo = true;
    } else {
      state.companies[length - per_page].scrollTo = true;
    }
  }

  return state;
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_COMPANIES:
      return Object.assign({}, process_data(state, action.payload));
    default:
      return state;
  }
}

export default reducer;
