module.exports = {
    // other configuration options...
  
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'vue-json-loader',
          type: 'javascript/auto',
        },
        // other rules...
      ],
    },
  };