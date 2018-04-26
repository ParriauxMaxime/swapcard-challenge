import React from 'react';
import { Route } from 'react-router-dom';
import { About } from "./Component/About";
import { ConnectedHome } from "./Component/Home";

const App = () => (
  <div>
    <Route exact path="/" component={ConnectedHome} />
    <Route exact path="/about" component={About} />
  </div>
);

export default App;
