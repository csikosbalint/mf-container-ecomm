import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './containers/Main';
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/*">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
