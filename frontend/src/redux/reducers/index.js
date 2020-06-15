import { combineReducers } from "redux";
import cart from "./cart";
import companies from "./companies";
import company from "./company";
import auth from "./auth";

export default combineReducers({ cart, companies, company, auth });
