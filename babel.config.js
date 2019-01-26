const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: "current",
      },
    },
  ],
];

const plugins = ['add-module-exports'];

module.exports = { presets, plugins };
