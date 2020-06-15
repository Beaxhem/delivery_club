import React from "react";
import ReactDOM from "react-dom";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/index.css";
import "./styles/dashboard.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/private/index";

import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./routes/Home";
import DetailedView from "./routes/DetailedView";

import Register from "./routes/auth/Register";
import Login from "./routes/auth/Login";
import LogOut from "./routes/auth/LogOut";

import Checkout from "./routes/Checkout";

import PartnersLogin from "./routes/partners/Login";
import PartnersRegister from "./routes/partners/Register";
import Dashboard from "./routes/partners/Dashboard";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/company/:slug" component={DetailedView} />
        <Route path="/checkout" component={Checkout} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/log_out" component={LogOut} />

        <Route path="/partners/login" component={PartnersLogin} />
        <Route path="/partners/register" component={PartnersRegister} />
        <PrivateRoute path="/partners/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
