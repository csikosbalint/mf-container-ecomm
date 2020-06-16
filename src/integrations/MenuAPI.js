import React, { useEffect } from 'react';

const MANIFEST = {
  name: 'Menu',
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
      objects: ['Button'],
    },
  },
};

export default function MenuAPI(props) {
  const { id, reactDOM, react } = props;
  useEffect(() => {
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
      iframeWindow.menuReactDOM = reactDOM;
      iframeWindow.React = react;
    }
  }, []);

  return (
    <iframe
      id={`${MANIFEST.name}-${id}-iframe`}
      title={`${MANIFEST.name}-${id}`}
      ns={MANIFEST.namespace}
      src="/MenuMF"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      style={{
        border: 0,
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
      }}
    ></iframe>
  );
}

export function consumes() {}

export function provides() {}
