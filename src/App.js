import React from 'react';
import MenuIntegration from './integrations/MenuIntegration';
import { createMuiTheme } from '@material-ui/core';
import './App.css';
import { green } from '@material-ui/core/colors';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Main from './containers/Main';
import MenuMF from './microfrontends/MenuMF';
export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

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
