module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "arrow-body-style": ["warn", "as-needed"],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "consistent-return": ["warn"],
    "camelcase": ["warn"],
    "no-param-reassign": ["error", { "props": false }],
    "import/extensions": ["warn"],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
