module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    "indent": ["off", 2],
    'no-console': 'off',
    'no-debugger': 'off'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
