const Visualizer = require('webpack-visualizer-plugin');
module.exports = (config, env) => {
  config.output.publicPath = `/ROOT`;
  config.optimization.runtimeChunk = false;
  config.optimization.flagIncludedChunks = true;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.plugins.push(
    new Visualizer({
      filename: './statistics.html',
      enabled: false,
    })
  );
  config.devServer = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    allowedHosts: ['localhost:3000'],
  };
  config.externals = [
    {
      // react: 'React',
      // 'react-dom': 'ReactDOM',
    },
    // externalMaterialUI,
  ];
  function externalMaterialUI(_, module, callback) {
    var isMaterialUIComponent = /^@material-ui\/core\/([^/]+)$/;
    var match = isMaterialUIComponent.exec(module);
    if (match !== null) {
      var component = match[1];
      return callback(null, `'@material-ui/core/${component}'`);
    }
    callback();
  }
  return config;
};
