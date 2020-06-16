import React from 'react';
import ReactDOM from 'react-dom';
import MenuAPI from '../integrations/MenuAPI';

export default function Main() {
  return (
    <>
      <div>
        <h1>Main</h1>
        <MenuAPI id="balint" react={React} reactDOM={ReactDOM} />
      </div>
    </>
  );
}
