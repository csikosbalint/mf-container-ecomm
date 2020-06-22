import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

const MANIFEST = {
  name: 'MenuMF',
  namespace: 'com.example',
  version: '1.0',
  description: '',
  requires: {
    React: {
      version: '^16.13.1',
    },
    ReactDOM: {
      version: '^16.13.1',
    },
    MaterialUI: {
      version: '^4.10.0',
      objects: ['ThemeProvider'],
    },
  },
};

export default function MenuAPI(props) {
  const { id, reactDOM, react, theme } = props;

  useEffect(() => {
    console.log(`useEffect`);
    let isReactDOMOkay = RegExp(
      `${MANIFEST.requires.ReactDOM.version}`,
      'g'
    ).test(reactDOM.version);

    let isReactOkay = RegExp(`${MANIFEST.requires.React.version}`, 'g').test(
      react.version
    );

    if (isReactDOMOkay && isReactOkay) {
      const iframeWindow = window.document.getElementById(
        `${MANIFEST.name}-${id}-iframe`
      ).contentWindow;

      iframeWindow.ReactDOM = reactDOM;
      iframeWindow.React = react;
      iframeWindow.MaterialUI = {
        ThemeProvider: ThemeProvider,
      };
      iframeWindow.theme = theme;
    }
  }, [id, reactDOM, react, theme]);
  return (
    <iframe
      id={`${MANIFEST.name}-${id}-iframe`}
      title={`${MANIFEST.name}-${id}`}
      ns={MANIFEST.namespace}
      src="/MF/menu"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      style={{
        border: 0,
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
      }}
      onLoad={() => {
        console.log(`onLoad`);
        window.document
          .getElementById(`${MANIFEST.name}-${id}-iframe`)
          .contentWindow.postMessage('start', 'https://www.sandbox-bud.net');
      }}
    ></iframe>
  );
}

export function consumes() {}

export function provides() {}
