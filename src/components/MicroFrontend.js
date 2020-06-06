import React from 'react';

class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        console.log(manifest);
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    const { name, window } = this.props;

    window[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, window } = this.props;
    // MF API
    window[`render${name}`](`${name}-container`);
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
