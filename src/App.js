import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
// test
const App = props => (
  <div>
    <Routes {...props.location} />
  </div>
);

export default withRouter(App);
