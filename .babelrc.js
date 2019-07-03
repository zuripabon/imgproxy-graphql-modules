module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.graphql']
      }
    ]
  ]
};
