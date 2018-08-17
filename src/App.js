import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import Welcome from "./welcome";
import About from "./about";
import Login from "./login";

import PrivateRoute from "./auth/PrivateRoute";
import AuthButton from "./auth/AuthButton";

const mainMenu = className => (
  <ul className={className}>
    <li>
      <Link to="/">Welcomes</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
  </ul>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AuthButton />
            <hr />
            {mainMenu("mainMenu")}
            <hr />
            <Route exact path="/" component={Welcome} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/about" component={About} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
