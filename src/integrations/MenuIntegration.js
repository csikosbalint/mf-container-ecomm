import React from 'react';
import ReactDOM from 'react-dom';

class MenuIntegrationtion extends React.Component {
  componentDidMount() {
    const { host, document, id } = this.props;
    const scriptId = `MF-script-Menu-${id}`;

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
        script.onload = () => {
          window[`renderMenu`](
            `MF-cont-${id}`,
            this.props.theme,
            `${host}${manifest.files['main.css']}`
          );
        };
        document.head.appendChild(script);
      })
      .catch((e) => {
        console.error(e);
        this.renderFallbackFrontend();
      });
  }

  componentWillUnmount() {
    const { window, id } = this.props;

    window[`unmountMenu`](`MF-cont-${id}`);
  }

  renderMicroFrontend = () => {
    const { window, id } = this.props;
    // MF API
    window[`renderMenu`](`MF-cont-${id}`);
  };

  renderFallbackFrontend = () => {
    const { id, fallback } = this.props;
    ReactDOM.render(fallback, document.getElementById(`MF-cont-${id}`));
  };

  render() {
    return <div id={`MF-cont-${this.props.id}`} />;
  }
}

MenuIntegrationtion.defaultProps = {
  document,
  window,
};

export default MenuIntegrationtion;
