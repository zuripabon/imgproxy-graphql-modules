module.exports = {
  "extends": "@spotahome/eslint-config-spotahome",
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": true,
        "peerDependencies": true
      }
    ],
    "no-unused-expressions": ["warn", { "allowTaggedTemplates": true }]
  }
}
