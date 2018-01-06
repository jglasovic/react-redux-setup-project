import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppView from "./views/AppView";

const Routes = props => (
  <Switch>
    <Route name="app" path="/" component={AppView} />
  </Switch>
);

export default Routes;
