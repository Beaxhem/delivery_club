import {
  RECEIVED_COMPANIES,
  RECEIVED_COMPANY,
} from "../constants/action-types";
import Axios from "axios";

export function getCompanies(last_id, PER_PAGE) {
  return (dispatch) => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/companies?last_id=${last_id}&per_page=${PER_PAGE}`
    ).then((json) => {
      dispatch({ type: RECEIVED_COMPANIES, payload: json.data });
    });
  };
}

export function getCompany(slug) {
  return (dispatch) => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/companies/company/${slug}`
    ).then((json) => {
      dispatch({ type: RECEIVED_COMPANY, payload: json.data });
    });
  };
}
