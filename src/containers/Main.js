import React from 'react';
import ReactDOM from 'react-dom';
import MenuAPI from '../integrations/MenuAPI';
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
  makeStyles,
} from '@material-ui/core';

export default function Main() {
  const theme = responsiveFontSizes(
    createMuiTheme({
      overrides: {
        MuiContainer: {
          root: {
            backgroundColor: 'lightblue',
          },
        },
      },
    })
  );
  const getClasses = makeStyles((theme) => ({
    container: {
      flexGrow: 1,
      height: 'inherit',
      minHeight: 'inherit',
    },
  }));
  const classes = getClasses();
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" className={classes.container}>
            <MenuAPI
              id="balint"
              react={React}
              reactDOM={ReactDOM}
              theme={theme}
            />
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
