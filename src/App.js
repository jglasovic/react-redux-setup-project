import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import Routes from "./routes";

const App = props => (
  <div>
    <Routes {...props.location} />
  </div>
);
export default withRouter(App);
