const { addBabelPlugin, override } = require("customize-cra");

module.exports = override(
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      rootPathSuffix: "src",
    },
  ]),
  // Ensure that all three plugins use the same 'loose' mode configuration
  addBabelPlugin([
    "@babel/plugin-proposal-class-properties",
    { "loose": true }
  ]),
  addBabelPlugin([
    "@babel/plugin-proposal-private-methods",
    { "loose": true }
  ]),
  addBabelPlugin([
    "@babel/plugin-proposal-private-property-in-object",
    { "loose": true }
  ])
);
