import React from 'react';
import MenuIntegration from './integrations/MenuIntegration';
import { createMuiTheme } from '@material-ui/core';
import './App.css';
import { green } from '@material-ui/core/colors';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  return (
    <MenuIntegration
      host="http://localhost:4000"
      id="MF1"
      theme={theme}
      fallback={
        <h2 style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
          This is the menu MF1 fallback.
        </h2>
      }
    />
  );
}
